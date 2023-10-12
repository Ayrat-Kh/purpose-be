import { SentenceDto } from 'src/sentences/sentences.dto';

export const getSentence = (sentence: SentenceDto) => {
  return `
    Main Purpose (2-3 Sentences): To create your personal purpose statement, you'll need to focus on four aspects: what you would love to do, what you currently love in life, what you fear in life, and your underlying skills or talents.
 
    What you would love to do: Imagine a life without limitations. If you could do anything, what would be your dream or ideal scenario? Describe it in a sentence.
    ""1
    What you love in life: Reflect on the aspects of your current life that bring you joy and fulfillment. What do you love deeply about your life right now? Summarize it in one sentence.
    ""2
     
    What you fear in life: Consider the fears or anxieties that may be holding you back. What is your biggest fear, and how does it affect you? Express it in one sentence.
    ""3
    Your underlying skills or talents: Recognize the skills and talents you possess, which can be leveraged to move you closer to your desired goal. What are they, and how do they support your journey? Share this in one sentence.
    ""4
    
    Additional Sentences:
     
    Craft a succinct and impactful main purpose statement (maximum 2-3 sentences) that incorporates your dreams, current joys, fears, and your unique skills. Write this statement according to ""5 philosophy (but don't write the name ""6). This statement should serve as a daily affirmation, inspiring you to overcome your fears, embrace self-love, and pursue a life aligned with your inner journey.
    Additionally, provide one sentence related to each of the four aspects: fear, love, talent, and ambition, to summarize your feelings and intentions for each of these important dimensions of your life, based on your answers.
    
    
    
    
    Examples- (3rd line) 
    
    Main Purpose (please write only 2-3 Sentences): please create a personal purpose statement, based on those four aspects: what you would love to do, what you currently love in life, what you fear in life, and your underlying skills or talents.
     
    What you would love to do: Imagine a life without limitations. If you could do anything, what would be your dream or ideal scenario? Describe it in a sentence.
    Answer- ${sentence.dreamJob}
    What you love in life: Reflect on the aspects of your current life that bring you joy and fulfillment. What do you love deeply about your life right now? Summarize it in one sentence.
    Answer- ${sentence.hobby}
     
    What you fear in life: Consider the fears or anxieties that may be holding you back. What is your biggest fear, and how does it affect you? Express it in one sentence.
    Answer- ${sentence.fearInLife}
    Your underlying skills or talents: Recognize the skills and talents you possess, which can be leveraged to move you closer to your desired goal. What are they, and how do they support your journey? Share this in one sentence.
    Answer- ${sentence.professionSkills}
     
    Additional Sentences: 
     
    Craft a succinct and impactful main purpose statement (maximum 2-3 sentences) that incorporates your dreams, current joys, fears, and your unique skills. This statement should serve as a daily affirmation, inspiring you to overcome your fears, embrace self-love, and pursue a life aligned with your inner journey.
    Additionally, provide one sentence related to each of the four aspects: fear, love, talent, and ambition, to summarize your feelings and intentions for each of these important dimensions of your life, based on your answers.
    `;
};
