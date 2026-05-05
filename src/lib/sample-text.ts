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
          s4e3a: {
            fr: "Pour l’instant, la chambre est encore vide de tout prodige : aucune boîte magique n’est apparue.",
          },
          s4e5: {
            fr: "La très jeune fille est allongée seule près du lit, comme si elle avait volontairement choisi de rester en dehors de la fête de ce soir.",
          },
          s4e7: {
            fr: "Le père porte un costume Louis XIV exagéré ; une cigarette à la main, il affiche une culpabilité évidente.",
          },
          s4e12: {
            fr: "On entend la belle-mère crier de l’étage : « Alors, tu viens ? Tout le monde t’attend ! » Le père prend aussitôt peur.",
          },
          s4e14: {
            fr: "Il tend précipitamment sa cigarette à sa fille et s’enfuit presque.",
          },
          s4e16: {
            fr: "La très jeune fille écrase la cigarette de son père dans un petit cendrier.",
          },
          s4e28: {
            fr: "Sa montre se met soudain à sonner.",
          },
          s4e36: {
            fr: "La lumière s’éteint brusquement. Aussitôt, tonnerre, fracas et cris lointains s’abattent comme une tempête. La très jeune fille hurle de peur.",
          },
          s4e39: {
            fr: "Quand la tempête cesse, la fée réapparaît et allume une cigarette comme si rien ne s’était passé.",
          },
          s4e46: {
            fr: "Quand la lumière revient, une immense boîte magique occupe désormais une bonne moitié de la chambre.",
          },
          s4e46a: {
            fr: "La boîte magique surgit soudain au milieu de la chambre, comme si elle avait poussé dans l’air.",
          },
          s4e53: {
            fr: "Méfiante, elle finit tout de même par entrer dans la boîte magique.",
          },
          s4e55: {
            fr: "Depuis l’intérieur, on entend les protestations de la jeune fille, pendant que la fée multiplie des gestes de prestidigitatrice outrés.",
          },
          s4e56: {
            fr: "Un énorme bang éclate depuis la boîte ; une fumée blanche se répand et la jeune fille pousse un cri.",
          },
          s4e58: {
            fr: "Quand la fumée se dissipe, la jeune fille ressort en toussant, affublée d’un costume de majorette.",
          },
          s4e62: {
            fr: "En râlant, la jeune fille finit par retourner dans la boîte.",
          },
          s4e63: {
            fr: "Après une seconde détonation encore plus forte, c’est un mouton qui semble surgir de la fumée.",
          },
          s4e64: {
            fr: "La très jeune fille, désormais déguisée en mouton, est si effrayée qu’elle refuse presque de s’approcher à nouveau de la boîte.",
          },
          s4e67: {
            fr: "La fée fait mine de fanfaronner, entre elle-même dans la boîte pour prouver que tout va bien… et s’y retrouve coincée.",
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
          s5e8: {
            fr: "La robe de la belle-mère est particulièrement ostentatoire. Elle marche en tête, sûre d’être la grande apparition de la soirée.",
          },
          s5e13: {
            fr: "Tout au long du trajet, elle s’était imaginé le roi et le prince comme dans un rêve. Mais à mesure qu’ils approchent du palais, les quatre personnages sentent un malaise grandissant, comme si la réalité glissait hors de leur scénario.",
          },
          s5e15: {
            fr: "Finalement, ils s’arrêtent devant les portes du palais ; les sons qui viennent de l’intérieur suffisent à leur faire comprendre que quelque chose cloche.",
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
        events: {
          s6e2: {
            fr: "Devant le palais, la foule se presse. De l’intérieur monte une musique terriblement moderne, presque agressive, à mille lieues du bal classique qu’ils avaient imaginé.",
          },
          s6e8: {
            fr: "Les quatre personnages montrent leurs invitations à l’entrée. La petite et la grande sœur jettent un œil à l’intérieur et pâlissent aussitôt.",
          },
          s6e11: {
            fr: "La belle-mère se penche à son tour vers l’intérieur, méfiante, et son visage se fige immédiatement.",
          },
          s6e20: {
            fr: "D’un geste sec, elle désigne le père et lui fait porter toute la faute.",
          },
          s6e25: {
            fr: "Elle se tourne ensuite vers le père et lui ordonne, à lui aussi, d’entrer.",
          },
          s6e30: {
            fr: "Des sifflets, des moqueries et des rires fusent aussitôt de l’intérieur : le père est devenu la risée de la fête. Au bout d’un moment, la grande sœur ressort, humiliée.",
          },
          s6e35: {
            fr: "Restée seule devant la porte, la belle-mère se cache le visage derrière son ombrelle, hésitant entre attendre le père ou s’enfuir à son tour.",
          },
          s6e38: {
            fr: "En se retournant, la belle-mère percute le très jeune prince. Il tombe presque assis par terre.",
          },
          s6e51: {
            fr: "La très jeune fille, vêtue de la robe de mariée de sa mère, arrive avec la fée devant le palais. Elle n’a pas le temps de tout observer que déjà le prince ressort, suivi de près par le roi.",
          },
          s6e63: {
            fr: "La très jeune fille et la fée restent légèrement en retrait pour écouter l’échange entre le père et le fils. À la fin, sa curiosité l’emporte sur son hésitation.",
          },
          s6e67: {
            fr: "Des acclamations reprennent de l’intérieur. Poussée par la curiosité, la très jeune fille finit elle aussi par entrer.",
          },
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
        events: {
          s7e2: {
            fr: "Une voix de cérémonie s’élève du fond de la scène : Mesdames et messieurs, le prince de Wagram et de Normandie, que vous attendiez depuis si longtemps, va chanter ce soir pour vous, et en anglais, une chanson dédiée à sa famille, et tout particulièrement à son père.",
          },
          s7e3: {
            fr: "La salle éclate en cris, en hourras et en applaudissements, comme une vague se ruant sur la scène.",
          },
          s7e6: {
            fr: "Le très jeune prince avance vers le public en chantant une reprise de « Father and Son ». Sa voix enfantine est maladroite mais sincère, comme une lettre ouverte improvisée.",
          },
          s7e9: {
            fr: "Juste avant la fin de la chanson, la très jeune fille se glisse derrière la scène pour se rapprocher du prince. Il la remarque sans interrompre son chant.",
          },
          s7e11: {
            fr: "La chanson s’achève et les applaudissements redoublent. À quelques mètres l’un de l’autre, le prince et la jeune fille se regardent sans parvenir à parler tout de suite.",
          },
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
        events: {
          s8e2: {
            fr: "Les applaudissements et les bravo résonnent encore à l’intérieur du palais. La très jeune fille, toute émue, jaillit dehors comme si elle venait d’échapper à un rêve trop vif.",
          },
          s8e6: {
            fr: "La fée l’attend à l’extérieur et lui fait signe de revenir, comme pour lui dire : déjà ? Tu ne vas pas partir maintenant.",
          },
          s8e8: {
            fr: "Au moment où la très jeune fille se décide à rentrer, les portes s’ouvrent brusquement. Le très jeune prince surgit presque en courant, comme s’il s’échappait de sa propre soirée.",
          },
          s8e11: {
            fr: "Ils se heurtent de plein fouet et le prince manque de tomber à la renverse.",
          },
          s8e18: {
            fr: "Ils repartent chacun dans une direction, puis s’arrêtent en même temps, se retournent et reviennent l’un vers l’autre. Tous deux sont visiblement gênés.",
          },
          s8e27: {
            fr: "La montre de la très jeune fille se met soudain à sonner, tranchant net ce moment qui venait à peine de commencer.",
          },
          s8e35: {
            fr: "Le très jeune prince reste là à la regarder partir, comme s’il ne comprenait pas encore ce qui venait de lui arriver, mais déjà incapable de vouloir que cela s’arrête.",
          },
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
        events: {
          e2: {
            fr: "LA VOIX DE LA NARRATRICE. Le lendemain, dans l’immense maison de verre de la future belle-mère, la crise éclata pour de bon.",
          },
          e6: {
            fr: "La belle-mère s’effondre sur la chaise, hagarde ; la grande sœur tourne autour d’elle avec nervosité.",
          },
          e11: {
            fr: "La belle-mère bondit brusquement de sa chaise, emportée par une colère soudaine.",
          },
          e27: {
            fr: "La belle-mère et la grande sœur se figent en même temps et se tournent vers la porte ; l’air semble soudain manquer dans la pièce.",
          },
          e34: {
            fr: "Le roi franchit la porte avec ses deux gardes, pressé mais toujours solennel.",
          },
          e42: {
            fr: "La belle-mère et les deux sœurs se penchent presque en même temps, le souffle suspendu.",
          },
          e48: {
            fr: "La très jeune fille entre en serrant son aspirateur contre elle ; elle a l’air épuisée mais toujours franche.",
          },
          e65: {
            fr: "La belle-mère se rassied et retrouve soudain un calme inquiétant, comme si une occasion dangereuse venait de s’offrir à elle.",
          },
          e89: {
            fr: "La belle-mère et les deux sœurs baissent la tête pour saluer le départ du roi ; les gardes se retournent au même moment.",
          },
          e95: {
            fr: "La belle-mère ne répond rien. Elle se lève dans un silence opaque et dangereux, puis s’éloigne.",
          },
          e102: {
            fr: "Quand tout le monde a disparu, la très jeune fille reste seule, son aspirateur à la main, comme soudain abandonnée par le monde.",
          },
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
        events: {
          s12e2: {
            fr: "LA VOIX DE LA NARRATRICE. Quelques instants plus tard, la seconde soirée devant le palais devient encore plus étrange que la première. Le roi brûle de voir son fils retrouver la personne qui l’a tant troublé ; la belle-mère, elle, s’imagine déjà être cette personne.",
          },
          s12e9: {
            fr: "Le roi souffle quelques mots d’encouragement à son fils puis désigne, à quelques pas, la belle-mère. Avec sa tenue extravagante et moderne, elle prend clairement cette soirée pour un signe du destin.",
          },
          s12e22: {
            fr: "Le prince reste comme cloué sur place. Sa peur se lit de plus en plus sur son visage ; ses lèvres remuent sans qu’il parvienne à intervenir.",
          },
          s12e29: {
            fr: "Le prince lève aussitôt la main pour appeler son père à l’aide. Le roi accourt et les gardes se tendent à leur tour.",
          },
          s12e46: {
            fr: "La belle-mère regarde autour d’elle comme si le sol venait de se dérober, incapable de comprendre comment la situation a pu se renverser si vite.",
          },
          s12e48: {
            fr: "Sur un signe du roi, les gardes s’avancent. La belle-mère se dégage en criant, se met à courir vers les portes du palais et déclenche les rires des invités. Dans la confusion, elle perd une chaussure.",
          },
          s12e51: {
            fr: "L’un des gardes se baisse pour ramasser la chaussure tombée ; l’autre garde encore l’entrée avec méfiance.",
          },
          s12e53: {
            fr: "Le roi reconduit son fils, encore bouleversé, à l’intérieur du palais. Devant l’entrée, il ne reste plus qu’un peu de nuit et les remous grotesques de la scène qui vient d’avoir lieu.",
          },
          s12e80: {
            fr: "Le prince comprend enfin le mensonge qu’on entretient depuis dix ans. Il éclate en sanglots ; la jeune fille s’avance et le serre dans ses bras.",
          },
          s12e87: {
            fr: "Le prince retire une chaussure et la tend à la jeune fille. Elle la reçoit avec soin, comme si elle recueillait enfin une preuve tardive et précieuse.",
          },
          s12e98: {
            fr: "Le très jeune prince reste devant le palais à la regarder partir, comme s’il apercevait pour la première fois un chemin vers l’avenir.",
          },
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
          s13e3a: {
            fr: "La chaussure du prince n’est pas encore visible ; la preuve n’entrera que plus tard avec la très jeune fille.",
          },
          s13e56a: {
            fr: "La chaussure apparaît enfin comme pièce à conviction au milieu du salon.",
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
        setting: {
          fr: "Dans l’antichambre de Yiyuanzhai, le décor est sobre et élégant : un comptoir pour recevoir les visiteurs et examiner les objets, une étagère d’antiquités au fond, l’enseigne suspendue au-dessus, la porte en haut à gauche et l’accès à l’arrière-boutique sur la droite. Yang Chengyue range des antiquités ; Xue’er l’aide ; Wang Chaojie arrive ensuite.",
        },
        events: {
          s1e2: {
            fr: "L’après-midi, à Yiyuanzhai, on n’entend presque que le bruit du chiffon sur la porcelaine. Yang Chengyue s’affaire derrière le comptoir ; Xue’er essaie de l’aider.",
          },
          s1e8: {
            fr: "Yang Chengyue lève la main pour prendre une assiette placée en hauteur et l’examine dans sa paume.",
          },
          s1e21: {
            fr: "Wang Chaojie tressaille légèrement et s’apprête à repartir.",
          },
          s1e28: {
            fr: "Wang Chaojie tapote doucement sa valise, le visage traversé d’hésitation.",
          },
          s1e30: {
            fr: "Yang Chengyue l’invite d’un geste à s’approcher du comptoir pour regarder la pièce de plus près.",
          },
          s1e44: {
            fr: "Wang Chaojie pose sa valise contre le comptoir, l’ouvre avec précaution et en sort une grande assiette de porcelaine peinte.",
          },
          s1e46: {
            fr: "Yang Chengyue tend la main pour retourner l’assiette et en voir la base, mais Wang Chaojie l’arrête d’un geste.",
          },
          s1e58: {
            fr: "De l’arrière-boutique monte une mélodie de « Qin Qiong vend son cheval ». Wang Chaojie ferme un instant les yeux, l’expression trouble.",
          },
        },
      },
      "scene-2-yiyuanzhai-ye": {
        title: { fr: "Scène 2" },
        subtitle: {
          fr: "Nuit de négociation, la porcelaine se brise et la vérité éclate.",
        },
        setting: {
          fr: "La nuit est tombée mais Yiyuanzhai reste éclairé. Sur le comptoir sont posés un service à thé et un support d’assiette ; l’étagère d’antiquités veille au fond. Yang Chengyue retient Wang Chaojie pour le repas, Xue’er reste à leurs côtés ; ils parlent d’opéra, discutent du prix, se quittent, puis la vérité éclate dans le fracas de la porcelaine brisée.",
        },
        events: {
          s2e2: {
            fr: "La nuit, la lumière éclaire encore la salle de devant de Yiyuanzhai. Au bord du comptoir, les plats et le thé attendent ; Wang Chaojie et Yang Chengyue parlent théâtre et prix, tandis que Xue’er se tient près d’eux.",
          },
          s2e31: {
            fr: "Yang Chengyue sourit sans rien dire, mais son regard ne quitte jamais le bord de l’assiette.",
          },
          s2e41: {
            fr: "Yang Chengyue pose les billets d’argent sur la table et les pousse devant Wang Chaojie.",
          },
          s2e48: {
            fr: "Wang Chaojie se retourne ; au loin, l’air de « Qin Qiong vend son cheval » reprend, comme pour accompagner cette transaction.",
          },
          s2e53: {
            fr: "D’un geste brusque, Yang Chengyue fait voler l’assiette : elle s’écrase au sol en mille morceaux.",
          },
          s2e53a: {
            fr: "Sur le comptoir, la grande assiette peinte cesse d’être un trésor : elle devient un amas de tessons froids.",
          },
          s2e56: {
            fr: "Il rapporte alors de l’arrière-boutique la véritable vieille assiette et la pose à côté des tessons pour les comparer.",
          },
          s2e62: {
            fr: "Sous la lampe, les éclats de porcelaine renvoient une lumière froide ; au loin, l’air de « Qin Qiong vend son cheval » s’élève à nouveau, comme un adieu pour Wang Chaojie et un soupir pour cette nuit.",
          },
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
