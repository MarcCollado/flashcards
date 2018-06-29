export const GET_DECKS = `{"query":"query {\
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
