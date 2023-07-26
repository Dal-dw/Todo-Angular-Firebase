import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  where,
} from '@angular/fire/firestore';
import Todo from '../interfaces/todo.interface';
import { Observable, Subject } from 'rxjs';

import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  orderAsc!: boolean;
  private orderSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private firestore: Firestore, private auth: Auth) {
    this.getOrderValue().then((orderValue) => {
      this.orderAsc = orderValue;
      this.orderSubject.next(this.orderAsc);
      console.log(this.orderAsc);
    });
  }

  addTodo(todo: Todo) {
    const uid = this.auth.currentUser?.email;
    const todoWithTimestamp = {
      ...todo,
      createdAt: serverTimestamp(),
      uid: uid,
    };
    const todoRef = collection(this.firestore, 'todos');

    return addDoc(todoRef, todoWithTimestamp);
  }

  getTodo(): Observable<Todo[]> {
    const uid = this.auth.currentUser?.email;
    console.log(uid);
    const todoRef = collection(this.firestore, 'todos');
    const userQuery = query(todoRef, where('uid', '==', uid));
    const order = this.orderAsc ? 'asc' : 'desc';
    const orderedQuery = query(userQuery, orderBy('createdAt', `${order}`));
    return collectionData(orderedQuery, { idField: 'id' }) as Observable<
      Todo[]
    >;
  }

  // getTodoAsc(): Observable<Todo[]> {
  //   const todoRef = collection(this.firestore, 'todos');
  //   const orderedQuery = query(todoRef, orderBy('createdAt', 'asc'));
  //   return collectionData(orderedQuery, { idField: 'id' }) as Observable<
  //     Todo[]
  //   >;
  // }

  deleteTodo(todo: Todo) {
    const uid = this.auth.currentUser?.email;
    const todoDocRef = doc(this.firestore, `todos/${todo.id}`);
    return deleteDoc(todoDocRef);
  }

  updateTodo(todo: Todo) {
    const uid = this.auth.currentUser?.email;
    const todoDocRef = doc(this.firestore, `todos/${todo.id}`);
    const { id, ...todoData } = todo;
    return updateDoc(todoDocRef, todoData);
  }

  async getOrderValue(): Promise<boolean> {
    const orderDocRef = doc(this.firestore, 'todos', 'orden');
    const orderDocSnap = await getDoc(orderDocRef);
    if (orderDocSnap.exists()) {
      const orderData = orderDocSnap.data();
      return orderData['orderValue'];
    } else {
      // Manejar el caso si el documento "orden" no existe
      return false; // O un valor predeterminado adecuado
    }
  }

  async changeOrder() {
    this.orderAsc = !this.orderAsc;
    this.orderSubject.next(this.orderAsc);
    const orderDocRef = doc(this.firestore, 'todos', 'orden');
    await updateDoc(orderDocRef, { orderValue: this.orderAsc });
    console.log(this.orderAsc);
  }

  getOrderSubject(): Observable<boolean> {
    return this.orderSubject.asObservable();
  }
}
