export const GET_DECKS_QUERY = `{"query":"query {\
  decks {\
    id\
    title\
    coverImageUrl\
    card {\
      question\
      answer\
    }\
  }\
}\
"}`;

export const GET_DECK_QUERY = (deckID) => {
  const DECK_ID = deckID.toString().trim();

  return `{"query":"query {\
      deck(id: \\"${DECK_ID}\\") {\
        id\
        title\
        coverImageUrl\
        card {\
          id\
          question\
          answer\
        }\
      }\
    }\
  "}`;
};

export const ADD_DECK_QUERY = (title, coverImageUrl) => {
  const TITLE = title.toString().trim();
  const URL = coverImageUrl.toString().trim();

  return `{"query":"mutation {\
  addDeck(deck: {\
      title: \\"${TITLE}\\",\
      coverImageUrl: \\"${URL}\\",\
    }) {\
        id\
        title\
        coverImageUrl\
        card {\
          question\
          answer\
        }\
      }\
    }\
  "}`;
};

export const ADD_CARD_QUERY = (deckID, question, answer) => {
  const DECK_ID = deckID.toString().trim();
  const QUESTION = question.toString().trim();
  const ANSWER = answer.toString().trim();

  return `{"query":"mutation {\
  addCardToDeck(deckID: \\"${DECK_ID}\\", card: {\
      question: \\"${QUESTION}\\",\
      answer: \\"${ANSWER}\\",\
      }) {\
        id\
        question\
        answer\
      }\
    }\
  "}`;
};
