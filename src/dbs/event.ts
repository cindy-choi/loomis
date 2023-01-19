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
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { v4 as uuidv4 } from 'uuid';

import type { EventProps } from '@/types/common';

const moment = extendMoment(Moment);
const RANGE_TYPE = {
  DAILY: 'days',
  WEEKLY: 'weeks',
  MONTHLY: 'months',
  YEARLY: 'years',
};

export const Database = {
  getList: async ({ startsAt, size = 30 }: { startsAt?: any; size: number }) => {
    const db = collection(firestore, 'events');

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
    const db = collection(firestore, 'events');
    const doc = await getDoc(doc(db, 'events', id));

    if (!!doc) return doc.data();
    return new Error('도큐먼트를 찾을 수 없습니다.');
  },

  create: async (data: EventProps) => {
    const db = collection(firestore, 'events');

    try {
      // 단일 생성
      if (data.repeat === 'NONE') {
        const doc = await addDoc(db, { ...data, archive: false });
        return doc?.id;
      }

      // 복수개 생성
      const repeatId = uuidv4();

      const repeatRange = moment().range(moment(data.date), moment(data.until));
      const batchs = Array.from(repeatRange.by(RANGE_TYPE[data.repeat] || 'days')).map((eachDate) => {
        const repeatData = { ...data, date: eachDate.format('YYYY-MM-DD'), repeatId: repeatId, archive: false };
        return addDoc(db, repeatData);
      });

      const response = await Promise.allSettled(batchs);
      return response?.length;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  makeDone: async (id: string) => {
    const db = collection(firestore, 'events');
    const ref = doc(db, id);
    if (!ref) throw new Error(`Cannot find events(${id})`);

    const _doc = await getDoc(ref);

    const newData = { ..._doc.data() };
    newData.status = 'DONE';

    const newDoc = await setDoc(ref, newData);
    return newDoc?.id;
  },

  archive: async (id: string, repeatAll?: boolean) => {
    const db = collection(firestore, 'events');
    const ref = doc(db, id);
    if (!ref) throw new Error(`Cannot find events(${id})`);

    const _doc = await getDoc(ref);

    const newData = { ..._doc.data() };
    newData.archive = false;

    if (newData.repeatId && repeatAll) {
      // TODO
    }

    const newDoc = await setDoc(ref, newData);
    return newDoc?.id;
  },

  update: async (data: EventProps) => {
    const db = collection(firestore, 'events');
    const doc = await updateDoc(db, data);
    return doc?.id;
  },

  // delete: async (id: string) => {
  //   const db = collection(firestore, 'events');
  //   const doc = await deleteDoc(doc(db, 'events', id));
  //   return doc?.id;
  // },
};

export default Database;
