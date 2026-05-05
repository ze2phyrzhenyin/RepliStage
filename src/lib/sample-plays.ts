import type { Play } from "@/types/script";
import rawDefaultPlay from "@/data/plays/cendrillon.json";
import rawQinqiongPlay from "@/data/plays/qinqiong-sells-horse.json";

export type SamplePlayDescriptor = {
  id: string;
  title: string;
  description: {
    zh: string;
    fr: string;
  };
  localeTag: "zh" | "fr";
  play: Play;
};

const frenchSamplePlay = rawDefaultPlay as Play;
const qinqiongSamplePlay = rawQinqiongPlay as Play;

export const samplePlays: SamplePlayDescriptor[] = [
  {
    id: "sample-french-cinderella",
    title: frenchSamplePlay.title,
    description: {
      zh: "法语示例剧本，保留现有多场次排练与导演编辑流程。",
      fr: "Script d’exemple en français, avec répétition multi-scènes et édition metteur en scène.",
    },
    localeTag: "fr",
    play: frenchSamplePlay,
  },
  {
    id: "sample-qinqiong-sells-horse",
    title: qinqiongSamplePlay.title,
    description: {
      zh: "中文示例剧本，围绕艺园斋夜谈与真伪揭晓展开两场戏。",
      fr: "Script d’exemple en chinois, en deux scènes autour d’Yiyuanzhai et de la révélation finale.",
    },
    localeTag: "zh",
    play: qinqiongSamplePlay,
  },
];

export const defaultSampleId = samplePlays[0].id;

export function getSamplePlay(sampleId: string) {
  return samplePlays.find((item) => item.id === sampleId);
}

export function clonePlay(play: Play): Play {
  return JSON.parse(JSON.stringify(play)) as Play;
}

export function defaultPlayFromSamples() {
  return clonePlay(samplePlays[0].play);
}

export function inferSampleSource(play: Play) {
  const serialized = JSON.stringify(play);
  const matched = samplePlays.find((item) => JSON.stringify(item.play) === serialized);
  return matched?.id ?? null;
}
