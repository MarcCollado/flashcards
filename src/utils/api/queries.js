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
