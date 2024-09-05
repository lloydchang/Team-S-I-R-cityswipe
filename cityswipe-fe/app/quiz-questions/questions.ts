const oldquizQuestions = {
  question1: "Where are you currently living?",
  question2: "Are you looking for luxury, mid-range, or budget destinations?",
  question3: "Which language(s) do you speak fluently?",
  question4: "Are you open to traveling to a country where the primary language is different from your native language?",
  question5: "Which season would you prefer to travel in?",
  question6: "Which climate preference do you have: warm, cold, or temperate?",
  question7: "What type of destination appeals to you the most: beach, mountain, or city?",
  question8: "List some of your favorite activities that you enjoy doing in your free time.",
  question9: "Do you have any dietary restrictions or preferences?",
  question10: "Are you interested in trying local cuisine, fine dining, or street food?",
  question11: "Are you looking for destinations with specific activities, health facilities, or services?",
  question12: "Are you comfortable traveling to a country where open recreational drug use is allowed?",
};

const quizQuestions = [
  {
    id: 1,
    question: "Where are you currently living?",
    answerOptions: [],
    additionalStringPlaceholder: "America",
    defaultValue: "not available",
    selectionType: "text",
    infoText: "",
  },
  {
    id: 2,
    question: "What is your travel Budget?",
    answerOptions: ["low", "moderate", "luxury"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "any budget level",
    selectionType: "multiple",
    infoText: "skip for any budget",
  },
  {
    id: 3,
    question: "How far are you willing to travel?",
    answerOptions: ["within the country", "neighbouring countries", "long road trip", "international travel"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "any distance",
    selectionType: "multiple",
    infoText: "skip for any distance",
  },
  {
    id: 4,
    question: "What are your accomodation preferences?",
    answerOptions: ["hotels", "resorts", "hostels", "Airbnb", "camping"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "any accomodation",
    selectionType: "multiple",
    infoText: "skip for any accomodation",
  },
  {
    id: 5,
    question: "Which language(s) can you communicate with?",
    answerOptions: [],
    additionalStringPlaceholder: "English, French etc.",
    defaultValue: "not available",
    selectionType: "text",
    infoText: "skip for any",
  },
  {
    id: 6,
    question: "Are you comfortable navigating places where your spoken languages are not widely spoken?",
    answerOptions: ["yes", "no"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "yes",
    selectionType: "single",
    infoText: "",
  },
  {
    id: 7,
    question: "What kind of climate do you prefer?  warm, cold, or temperate?",
    answerOptions: ["warm", "cold", "mild", "tropical"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "any climate",
    selectionType: "multiple",
    infoText: "skip for any climate",
  },
  {
    id: 8,
    question: "What type of landscapes appeals to you?",
    answerOptions: ["city", "beaches", "mountains", "countrysides"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "any landscape/scenery",
    selectionType: "multiple",
    infoText: "skip for any landscape/scenery",
  },
  {
    id: 9,
    question: "What type of outdoor activities are you looking for?",
    answerOptions: ["sports", "extreme sports", "snow activities", "cultural landmarks", "museums"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "none in particular",
    selectionType: "multiple",
    infoText: "skip for none in particular",
  },
  {
    id: 10,
    question: "What type of urban activities are you looking for?",
    answerOptions: ["shopping", "dining", "nightlife", "quiet environment"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "none in particular",
    selectionType: "multiple",
    infoText: "skip for none in particular",
  },
  {
    id:11,
    question: "Do you have any dietary restrictions or preferences?",
    answerOptions: ["vegetarian", "vegan", "halal", "Kosher"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "none",
    selectionType: "single",
    infoText: "skip for none",
  },
  {
    id: 12,
    question: "What are your dining prefererences?",
    answerOptions: ["local cuisine", "fine dining", "street food"],
    additionalStringPlaceholder: "other / additional information",
    defaultValue: "none in particular",
    selectionType: "multiple",
    infoText: "skip for none in particular",
  },
  {
    id: 13,
    question: "Are you looking for anything in particular?/Additional information",
    answerOptions: [],
    additionalStringPlaceholder: "other requirements/preferances for locations",
    defaultValue: "no additional information",
    selectionType: "text",
    infoText: "",
  },
];

export default quizQuestions;