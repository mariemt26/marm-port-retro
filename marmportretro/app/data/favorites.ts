/* =====================================================
   Favorites — the Finder window on the About page.
   Images go in public/favorites/ and paths start with "/".
   Delete any category you don't want; the tabs adapt.
   ===================================================== */

export type Favorite = {
  title: string;
  by?: string;
  image?: string;
  note?: string;
};

export type FavoriteGroup = {
  name: string;
  items: Favorite[];
};

export const favorites: FavoriteGroup[] = [
  {
    name: "Books",
    items: [
      {
        title: "Jade City",
        by: "Fonda Lee",
        image: "/favorites/JadeCity.jpg",
        note: "This is genuinely what an adult fantasy should be like.",
      },
      { title: "The Poppy War", by: "R.F. Kuang", image: "/favorites/ThePoppyWar.webp", note: "Another fantasy, historical fantasy, but honestly one of the best debuts I've read.", },
      { title: "I Who Have Never Known Men", by: "Jacqueline Harpman", image: "/favorites/IWhoHave.webp", note: "I had to take a break from reading after this one.", },
      { title: "The Adventures of Amina Al-Sirafi", by: "Shannon Chakraborty", image: "/favorites/aminaalsirafi.jpg", note: "I love good Muslim rep, what can I say. Can you tell I really love fantasy.", },
      { title: "Never Let Me Go", by: "Kazuo Ishiguro", image: "/favorites/neverletmego.jpg", note: "Read this in one day and was horrified. Also cried. 10/10.", },
    ],
  },
  {
    name: "Anime",
    items: [
      {title: "Lupin the Third", by: "TMS Entertainment", image: "/favorites/LupinIII.webp", note: "Part 4 is set in San Marino — the reason all my plants have Italian names.",},
      { title: "Paradise Kiss", by: "Studio Madhouse", image: "/favorites/paradisekiss.jpg", note: "The fashion, the complex relationships, and Tommy heavenly6. What is not to love about this one?", },
      { title: "Ping Pong the Animation", by: "Tatsunoko Production", image: "/favorites/pingpong.jpg", note: "Watched this one during a tough transitional period of my life. I hold a huge soft spot for it.",},
      { title: "Neon Genesis Evangelion", by: "Gainax", image: "/favorites/evangelion.jpg", note: "This made me realize that my writing lore wasn't mind-bending enough", },
      { title: "Mob Pyscho 100", by: "Studio Bones", image: "/favorites/mobpsycho.jpg", note: "WE LOVE MOB!",},
    ],
  },
  {
    name: "Music",
    items: [
      { title: "Red Moon in Venus", by: "Kali Uchis", image: "/favorites/RedMooninVenus.png", note: "I DON'T PLAY AROUND ABOUT KALI. I LOVE HER.", },
      { title: "Love Deluxe", by: "Sade", image: "/favorites/LoveDeluxe.png", note: "Huge thanks to my dad for indirectly convincing me to buy her best hits CD.", },
      { title: "Londra", by: "Qendresa", image: "/favorites/Londra.jpg", note: "She's still niche and I want her to stay that way. Real ones like her.",  },
      { title: "Traveling Without Moving", by: "Jamiroquai", image: "/favorites/jerkyquai.png", note: "Jerkyquai.", },
      { title: "Invincible", by: "Michael Jackson", image: "/favorites/Mjinvincible.jpg", note: "Lifelong MJ fan.",  },
    ],
  },
  {
    name: "Film & TV",
    items: [
      { title: "Breaking Bad", by: "Vince Gilligan", image: "/favorites/breakingbad.jpg" },
      { title: "Little Women", by: "Greta Gerwig", image: "/favorites/littlewomen.jpg" },
    ],
  },
  {
    name: "Games",
    items: [
      { title: "Deltarune", by: "Toby Fox", image: "/favorites/deltarune.webp", note: "DIdn't put Undertale on this list because I've been so obsessed with it the past 10 years, everyone who knows me well enough knows that.", },
      { title: "Persona 5", by: "ATLUS", image: "/favorites/persona_5_cover_art.jpg", note: "The entire series is amazing but 5 is where I started. Also, I love Futaba.", },
      { title: "Neir Automata", by: "ATLUS", image: "/favorites/neir.jpg", note: "First time I ever played an RPG like this. Felt good not dying a million times.", },
      { title: "Pokemon", by: "GameFreak", image: "/favorites/usum.jpg", note: "I love the entire series but I am an unapologetic gen 7 defender till' my last breath.", },
      { title: "Hollow Knight", by: "Sutdio Cherry", image: "/favorites/hollowknight.jpg", note: "The Knight was Hollow alright.", },
    ],
  },
];
