import type { Play, ScriptDefinition, ScriptEvent } from "@/types/script";

type AppLocale = "zh" | "fr";
type LocalizedValue = Partial<Record<AppLocale, string>>;

type SampleTextOverrides = {
  playTitle?: LocalizedValue;
  scenes?: Record<string, {
    title?: LocalizedValue;
    subtitle?: LocalizedValue;
    setting?: LocalizedValue;
    events?: Record<string, LocalizedValue>;
  }>;
};

const SAMPLE_TEXTS: Record<string, SampleTextOverrides> = {
  cinderella: {
    playTitle: {
      zh: "灰姑娘",
      fr: "Cendrillon",
    },
    scenes: {
      "scene-4-depart-soiree": {
        subtitle: {
          zh: "启程赴国王晚会。",
          fr: "Départ à la soirée du roi.",
        },
        setting: {
          fr: "La très jeune fille est seule dans sa chambre, allongée près du lit où subsistent encore des traces des affaires de sa mère. Son père, vêtu à la Louis XIV, vient lui dire au revoir puis s’éclipse avec gêne. La fée sort ensuite de derrière l’armoire, tente de la convaincre d’aller à la soirée du roi et entreprend de lui préparer une robe au moyen d’une boîte magique peu fiable.",
        },
        events: {
          s4e2: {
            fr: "LA VOIX DE LA NARRATRICE. Enfin arriva le grand jour que tout le monde attendait.",
          },
        },
      },
      "scene-5-abords-palais": {
        subtitle: {
          zh: "与此同时，在国王宫殿附近。",
          fr: "Au même instant, aux abords du palais du roi.",
        },
        setting: {
          fr: "La belle-mère, le père et les deux sœurs arrivent près du palais dans une voiture de luxe. Ils choisissent de parcourir à pied les cent derniers mètres afin que les curieux puissent admirer leurs somptueux habits à la Louis XIV. Pleins d’assurance, ils s’avancent vers la fête, mais sentent déjà devant les portes que quelque chose cloche.",
        },
        events: {
          s5e2: {
            fr: "LA VOIX DE LA NARRATRICE. Pour se rendre à la soirée du roi, la future belle-mère, le père et les deux futures sœurs avaient loué une voiture de luxe avec chauffeur. Puis ils décidèrent de faire à pied les cent derniers mètres pour que tous ceux qui ne pouvaient pas entrer puissent au moins les voir arriver.",
          },
        },
      },
      "scene-6-devant-palais": {
        subtitle: {
          zh: "片刻之后，在宫殿前。",
          fr: "Quelques instants plus tard, devant le palais.",
        },
        setting: {
          fr: "Devant le palais résonne une musique incroyablement moderne. La belle-mère, les deux sœurs et le père arrivent avec leurs cartons d’invitation, mais découvrent aussitôt que le style de la soirée n’a rien à voir avec ce qu’ils imaginaient. Dans la confusion, la belle-mère percute d’abord le très jeune prince ; puis la très jeune fille arrive avec la fée et assiste à la scène où le roi pousse son fils à retourner au centre de la fête.",
        },
      },
      "scene-7-interieur-palais": {
        subtitle: {
          zh: "片刻之后，在宫殿内部。",
          fr: "Quelques instants plus tard, à l’intérieur du palais.",
        },
        setting: {
          fr: "À l’intérieur du palais, la scène est noyée de lumière. Un pied de micro attend le prince au centre. La voix du présentateur, les cris du public et les applaudissements enveloppent toute la salle, tandis que la très jeune fille se glisse discrètement vers le fond de la scène à la fin de la chanson.",
        },
      },
      "scene-8-devant-portes-palais": {
        subtitle: {
          zh: "片刻之后，在宫殿大门外。",
          fr: "Quelques instants plus tard, devant les portes du palais.",
        },
        setting: {
          fr: "À l’extérieur des portes du palais, les applaudissements et les bravo continuent de jaillir de l’intérieur. La très jeune fille sort la première, la fée l’attend dehors ; le prince surgit ensuite presque en courant. Ils se percutent devant l’entrée et échangent enfin quelques mots, pour la première fois vraiment.",
        },
      },
      "scene-9-maison-en-verre": {
        subtitle: {
          zh: "在玻璃房里。",
          fr: "Dans la maison en verre de la belle-mère de la très jeune fille.",
        },
        setting: {
          fr: "Au centre de la grande maison en verre se trouve une chaise ; à droite, l’accès à l’intérieur, en haut à gauche la porte, et en bas à droite l’espace de ménage. La belle-mère, anéantie, est assise ; la grande sœur tourne autour d’elle avec agitation, puis la petite sœur, le roi, les gardes et la très jeune fille entrent à leur tour.",
        },
      },
      "scene-12-devant-palais": {
        subtitle: {
          zh: "片刻之后，在宫殿前。",
          fr: "Quelques instants plus tard, devant le palais.",
        },
        setting: {
          fr: "Devant le palais, les lumières ne sont pas encore éteintes. Le roi parle à voix basse avec son fils près de l’entrée, tandis que la belle-mère, habillée d’une tenue excentrique et très moderne, attend à quelques pas. Deux gardes se tiennent non loin. Plus tard, la très jeune fille arrive à l’extérieur du palais et engage avec le prince leur première véritable conversation.",
        },
      },
      "scene-13-maison-en-verre": {
        subtitle: {
          zh: "在玻璃房里。",
          fr: "Dans la maison en verre.",
        },
        setting: {
          fr: "Le lendemain, l’inquiétude remplit la maison en verre. La grande sœur, accablée, reste assise sur la chaise ; la petite sœur veille près de la porte ; la belle-mère s’est enfermée, malade et vacillante. Quand on sonne de nouveau, le roi et les gardes entrent, et la très jeune fille finit par dire la vérité au grand jour.",
        },
        events: {
          s13e2: {
            fr: "LA VOIX DE LA NARRATRICE. Le lendemain, dans la maison en verre, tout le monde suffoquait d’inquiétude. Depuis son retour de la soirée du palais, la future belle-mère s’était enfermée dans sa chambre et son état ne cessait d’alarmer la maison.",
          },
          s13e89: {
            fr: "LA VOIX DE LA NARRATRICE. À partir de ce jour, la très jeune fille quitta cette maison avec son père. Plus tard, il se remaria avec une femme moins désagréable et finit même par arrêter de fumer.",
          },
          s13e90: {
            fr: "LA VOIX DE LA NARRATRICE. Dans la maison de l’ancienne future belle-mère, un phénomène curieux se produisit alors : les oiseaux cessèrent de se cogner contre les parois invisibles, mais le bruit de l’impact continua encore longtemps à troubler la tranquillité de la famille.",
          },
          s13e91: {
            fr: "LA VOIX DE LA NARRATRICE. Heureusement, un jour, tout finit par se taire.",
          },
        },
      },
      "scene-14-mere-mourante": {
        subtitle: {
          zh: "记忆、仙女与母亲临终的房间。",
          fr: "La mémoire, la fée et la chambre de la mère mourante.",
        },
        setting: {
          fr: "L’histoire touche à sa fin. D’abord, seule subsiste la voix de la narratrice ; puis l’espace revient à la chambre du début, celle où se trouve le lit de la mère mourante. Aux côtés de la fée, la très jeune fille revoit les derniers instants de sa mère comme s’ils se projetaient devant elle.",
        },
        events: {
          s14e2: {
            fr: "LA VOIX DE LA NARRATRICE. Voilà, l’histoire approche de sa fin. Qu’elle soit mon histoire ou celle de quelqu’un d’autre n’a plus vraiment d’importance. Ma mémoire est fatiguée, comme si mon corps et ma voix n’habitaient plus le même endroit ; mais ma vie a été longue, très heureuse, et j’en suis comblée.",
          },
          s14e3: {
            fr: "LA VOIX DE LA NARRATRICE. Pourtant, je le sais, il reste encore un détail sur la très jeune fille que vous voudriez connaître. Alors je vais vous le dire : un jour, elle demanda à la fée, devenue son amie, de lui faire réentendre les mots prononcés par sa mère avant de mourir.",
          },
          s14e13: {
            fr: "LA VOIX DE LA NARRATRICE. Bien sûr, revoir ainsi sa mère la rendit triste. Mais à partir de ce jour, chaque fois qu’elle pensa à elle, ce ne fut plus seulement de la peine qu’elle sentit, mais une force capable de la faire avancer.",
          },
        },
      },
      "scene-15-nuit-de-fete": {
        subtitle: {
          zh: "更晚一些。一个节庆之夜。",
          fr: "Plus tard. Une nuit de fête.",
        },
        setting: {
          fr: "Bien plus tard, lors d’une nuit de fête, la musique s’élève. Le plateau devient une esplanade de célébration, surmontée d’une chaude lumière de bal. Le très jeune prince et la très jeune fille dansent avec abandon pendant que la narratrice dépose les derniers mots de l’histoire au-dessus d’eux.",
        },
        events: {
          s15e9: {
            fr: "LA VOIX DE LA NARRATRICE. Ces moments-là non plus, elle ne les oublia jamais. Même lorsque la vie les emmena dans des directions différentes, le très jeune prince et la très jeune fille continuèrent à s’écrire, jusqu’au bout de leur existence.",
          },
          s15e11: {
            fr: "LA VOIX DE LA NARRATRICE. Voilà, c’est fini. Heureusement, même les erreurs ont une fin. Alors maintenant, je me tais et je m’en vais.",
          },
        },
      },
    },
  },
  "qinqiong-maimai": {
    playTitle: {
      zh: "秦琼卖马",
      fr: "Qin Qiong vend son cheval",
    },
    scenes: {
      "scene-1-yiyuanzhai": {
        title: { fr: "Scène 1" },
        subtitle: {
          fr: "Un après-midi à Yiyuanzhai, un visiteur se présente.",
        },
      },
      "scene-2-yiyuanzhai-ye": {
        title: { fr: "Scène 2" },
        subtitle: {
          fr: "Nuit de négociation, la porcelaine se brise et la vérité éclate.",
        },
      },
    },
  },
};

function getSceneOverride(playId: string, sceneId: string) {
  return SAMPLE_TEXTS[playId]?.scenes?.[sceneId];
}

export function getLocalizedPlayTitle(play: Play, locale: AppLocale) {
  return SAMPLE_TEXTS[play.id]?.playTitle?.[locale] ?? play.title;
}

export function getLocalizedSceneTitle(play: Play, scene: ScriptDefinition, locale: AppLocale) {
  return getSceneOverride(play.id, scene.id)?.title?.[locale] ?? scene.title;
}

export function getLocalizedSceneSubtitle(play: Play, scene: ScriptDefinition, locale: AppLocale) {
  return getSceneOverride(play.id, scene.id)?.subtitle?.[locale] ?? scene.subtitle;
}

export function getLocalizedSceneSetting(play: Play, scene: ScriptDefinition, locale: AppLocale) {
  return getSceneOverride(play.id, scene.id)?.setting?.[locale] ?? scene.setting;
}

export function getLocalizedEventText(play: Play, scene: ScriptDefinition, event: ScriptEvent, locale: AppLocale) {
  return getSceneOverride(play.id, scene.id)?.events?.[event.id]?.[locale] ?? event.text ?? null;
}
