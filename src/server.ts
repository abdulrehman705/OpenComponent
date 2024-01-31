import { Server } from 'oc-server';

const userDatabase = [
  { name: 'John Doe', born: 1986, hobbies: ['Swimming', 'Basketball'] },
  { name: 'Jane Doe', born: 1991, hobbies: ['Running', 'Rugby'] },
];

const yearsFunFactDatabase: Record<number, string> = {
  1986: "Halley's Comet made its closest approach to Earth in 1986, visible to the naked eye.",
  1987: 'The first Final Fantasy game was released in 1987.',
  1991: 'The first web page was created in 1991 by Tim Berners-Lee.',
};

async function getUser(userId: number) {
  return userDatabase[userId];
}

async function getFunFact(year: number) {
  return yearsFunFactDatabase[year];
}

export const server = new Server(async (params: { userId: number }) => {
  const { userId } = params;
  const user = await getUser(userId);
  const [firstName, lastName] = user.name.split(/\s+/);

  if (firstName === 'Invalid') {
    return;
  }

  return {
    firstName,
    lastName,
    born: user.born,
    hobbies: user.hobbies,
  };
}).action('funFact', async (params: { year: number }) => {
  const { year } = params;
  const funFact = await getFunFact(year);

  return {
    funFact,
  };
});

declare module 'oc-server' {
  interface Register {
    server: typeof server;
  }
}
