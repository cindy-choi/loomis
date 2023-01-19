import { analytics, firestore } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  orederBy,
  limit,
  startAt,
} from 'firebase/firestore';

import type { TaskProps } from '@/types/common';

export const Database = {
  getList: async ({ startsAt, size = 30 }: { startsAt?: any; size: number }) => {
    const db = collection(firestore, 'tasks');

    let q = query(db, limit(size));
    if (startsAt) q = query(db, limit(size), startAt(startsAt || null));

    const doc = await getDocs(q);

    if (!!doc.docs)
      return doc.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
    return new Error('도큐먼트를 찾을 수 없습니다.');
  },

  get: async (id: string) => {
    const db = collection(firestore, 'tasks');
    const doc = await getDoc(doc(db, 'tasks', id));

    if (!!doc) return doc.data();
    return new Error('도큐먼트를 찾을 수 없습니다.');
  },

  create: async (data: TaskProps) => {
    const db = collection(firestore, 'tasks');
    // setDoc 은 ID 를 넣어야 하고 addDoc은 자동 추가

    const doc = await addDoc(db, { ...data, isCompleted: false, archive: false });
    return doc?.id;
  },

  makeDone: async (id: string) => {
    const db = collection(firestore, 'tasks');
    const ref = doc(db, id);
    if (!ref) throw new Error(`Cannot find task(${id})`);

    const _doc = await getDoc(ref);

    const newData = { ..._doc.data() };
    newData.status = 'DONE';

    const newDoc = await setDoc(ref, newData);
    return newDoc?.id;
  },

  archive: async (id: string) => {
    const db = collection(firestore, 'tasks');
    const ref = doc(db, id);
    if (!ref) throw new Error(`Cannot find task(${id})`);

    const _doc = await getDoc(ref);

    const newData = { ..._doc.data() };
    newData.archive = false;

    const newDoc = await setDoc(ref, newData);
    return newDoc?.id;
  },

  update: async (data: TaskProps) => {
    const db = collection(firestore, 'tasks');
    const doc = await updateDoc(db, data);
    return doc?.id;
  },

  // delete: async (id: string) => {
  //   const db = collection(firestore, 'tasks');
  //   const doc = await deleteDoc(doc(db, 'tasks', id));
  //   return doc?.id;
  // },
};

export default Database;
