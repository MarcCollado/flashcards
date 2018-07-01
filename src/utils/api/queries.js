export const GET_DECKS_QUERY = `{"query":"query {\
  decks {\
    id\
    title\
    coverImageUrl\
    quiz {\
      question\
      answer\
    }\
  }\
}\
"}`;

export const ADD_DECKS_QUERY = (title, coverImageUrl) => {
  const TITLE = title.toString();
  const URL = coverImageUrl.toString();

  return `{"query":"mutation {\
  addDeck(deck: {\
      title: \\"${TITLE}\\",\
      coverImageUrl: \\"${URL}\\",\
    }) {\
        id\
        title\
        coverImageUrl\
        quiz {\
          question\
          answer\
        }\
      }\
    }\
  "}`;
};

export const ADD_QUIZ_QUERY = (deckID, question, answer) => {
  const DECK_ID = deckID;
  const QUESTION = question;
  const ANSWER = answer;

  return `{"query":"mutation {\
  addQuizToDeck(deckID: \\"${DECK_ID}\\", quiz: {\
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
