// shared data across instances so we load only once

import { ref } from "vue";

declare global {
  const fathom: {
    trackGoal: (id: string, value: number) => any;
  };
}

export interface Partners {
  url: string;
  img: string;
  name: string;
  description?: string;
  priority?: boolean;
}

export interface PartnersData {
  special: Partners[];
  platinum: Partners[];
  platinum_china: Partners[];
  gold: Partners[];
  silver: Partners[];
  bronze: Partners[];
}

export const data = ref<PartnersData>();
export const pending = ref<boolean>(false);

export const base = `https://asset.cloudinary.com/kamounation/`;
export const constantImage = "e5726ea81155fde3902ac847136a2c18";
export const load = async () => {
  if (!pending.value) {
    pending.value = true;
    data.value = await (
      await fetch(`${base}/e5726ea81155fde3902ac847136a2c18`)
    ).json();
  }
};
