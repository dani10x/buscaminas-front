import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Mensaje } from '../models/Mensaje.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient!: Client;
  private serverUrl = 'ws://localhost:8080/buscaminas';
  private topicSubjects: Map<string, Subject<string>> = new Map();

  constructor() { }

  public connect(): Observable<Mensaje> {
    return new Observable<Mensaje>((observer) => {
      this.stompClient = new Client({
        brokerURL: this.serverUrl,
        reconnectDelay: 5000,
        webSocketFactory: () => new WebSocket(this.serverUrl),
        onConnect: (frame) => {
          console.log('Connected: ' + frame);
          observer.next({
            error: false,
            respuesta: 'Conectado al servidor',
          });
          observer.complete(); 
        },
        onStompError: (error) => {
          console.error('STOMP error', error);
          observer.error({
            error: true,
            respuesta: 'Error al conectar con el servidor',
          });
        },
      });
  
      this.stompClient.activate();
    });
  }

  public subscribeToTopic(topic: string): Observable<string> {
    // Si ya existe una suscripción activa para el tópico, retorna su Observable
    if (this.topicSubjects.has(topic)) {
      return this.topicSubjects.get(topic)!.asObservable();
    }

    // Crear un nuevo Subject para el tópico
    const topicSubject = new Subject<string>();
    this.topicSubjects.set(topic, topicSubject);

    // Suscribirse al tópico en el WebSocket
    this.stompClient.subscribe(topic, (message: Message) => {
      console.log(`Received message on topic ${topic}: `, message.body);
      topicSubject.next(message.body); // Emitimos el mensaje a través del Subject
    });

    return topicSubject.asObservable(); // Retornar el Observable
  }

  public disconnect(): Observable<Mensaje> {
    return new Observable<Mensaje>((observer) => {
      if (this.stompClient) {
        this.stompClient.deactivate();  
        observer.next({
          error: false,
          respuesta: "Coexión cerrada"
        });
        observer.complete(); 
      } else {
        observer.error({
          error: true,
          respuesta: 'Error al cerrar la conexión'
        });
      }
    });
  }

  public sendMessage(destination: string, message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: destination, // Ejemplo: "/app/send-message"
        body: JSON.stringify(message),
      });
    }
  }
  
}
