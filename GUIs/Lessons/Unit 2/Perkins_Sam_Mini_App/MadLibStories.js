// stories were created from the website: https://www.madtakes.com/ and consolidated using my own code
// so as not to plagiarize the website's content, this is an APA citation citing the source of the stories
// Nathanael Huddleson (2004 - 2024). Selected Stories. Site ground. Retrieved February 12, 2024, from https://www.madtakes.com/

const storyRepo = [`NUMBER [1], POOP [2], WISH [3]`,
`VERB [1] , NOUN (PLURAL) [9] ,
ADJECTIVE [2] , NOUN (PLURAL) [10] ,
NOUN (PLURAL) [3] , NOUN (PLURAL) [11] ,
ADJECTIVE [4] , RELATIVE (PLURAL) [12] ,
VERB ENDING IN "ING" [5] , ADJECTIVE [13] ,
VERB [6] , ADJECTIVE [14] ,
NUMBER [7] , NOUN (PLURAL) [15] ,
ADJECTIVE [8]`, 
`SILLY NAME [1] , NOUN (PLURAL) [9] ,
SILLY WORD [2] , VERB [10] ,
VERB [3] , NOUN [11] ,
NOUN [4] , OCCUPATION [12] ,
BODY PART (PLURAL) [5] , NUMBER [13] ,
FEMALE NAME [6] , VERB [14] ,
VERB ENDING IN "ED" [7] , SILLY WORD [15]`,
`VERB [1] , ADJECTIVE [5] ,
ADJECTIVE [2] , VERB ENDING IN "ED" [6] ,
ADJECTIVE [3] , NOUN [7] ,
NOUN [4] , VERB ENDING IN "ING" [8],`,
`VERB [1] , ADJECTIVE [15] ,
BODY PART (PLURAL) [2] , EVENT [16] ,
NUMBER [3] , NOUN (PLURAL) [17] ,
NOUN (PLURAL) [4] , NUMBER [18] ,
BODY PART [5] , BODY PART [19] ,
VERB [6] , VERB ENDING IN "ING" [20] ,
VERB ENDING IN "ED" [7] , VERB ENDING IN "ED" [21] ,
VERB [8] , ANIMAL [22] ,
BODY PART (PLURAL) [9] , OCCUPATION [23] ,
NOUN [10] , OCCUPATION [24] ,
ADJECTIVE [11] , ILLNESS [25] ,
NOUN (PLURAL) [12] , VERB [26] ,
VERB [13] , NOUN [27] ,
VERB ENDING IN "ED" [14] ,`,
`ADVERB [1] , ADJECTIVE [8] ,
NOUN [2] , NOUN [9] ,
LIQUID [3] , NOUN (PLURAL) [10] ,
VERB [4] , ILLNESS [11] ,
NUMBER [5] , OCCUPATION [12] ,
NOUN (PLURAL) [6] , BODY PART (PLURAL) [13] ,
VERB [7] , BODY PART [14] ,`]

const outPut = [`I am [1] years old, and I expel [2]. In fact I expel [1] [2]s per day. I have [1] wishes that [3].`
,` Come [1] at WALMART, where you'll receive [2] discounts on all of your favorite brand name [3] . Our [4] and [5] associates are there to [6] you [7] hours a day. Here you will find [8] prices on the [9] you need. [10] for the moms, [11] for the kids and all the latest electronics for the [12] . So come on down to your [13] [14] WALMART where the [15] come first.`
,`Dear Mr. and Mrs. [1] [2] , Will you let me [3] your [4] ? Ever since I have laid [5] on [6] , I have [7] madly in love with her. I wish that she will be the [8] of my [9] and that someday we will [10] happily ever after. I have a [11] as a/an [12] that pays $ [13] each month. I promise to [14] your daughter with kindness and respect.,, Sincerely,, [15] [16] "`
, `While anyone can [1] to themselves they were [2] , the true test is admission to someone else.,- Faults are [3] where [4] is thin.,- The only real way to look [5] is not to be [6] so soon.,- Always try to do things in chronological [7] ; it's less [8] that way.`
, `In faith, I do not [1] thee with mine [2] ,For they in thee [3] [4] note,,But 'tis my [5] that loves what they [6] ,,Who in despite of view is [7] to [8] .,Nor are mine [9] with thy tongue's [10] delighted,,Nor [11] feeling, to base [12] prone, Nor taste, nor smell, [13] to be [14] ,To any [15] [16] with thee alone:,But my five [17] nor my [18] senses can,Dissuade one foolish [19] from [20] thee,,Who leaves [21] the likeness of a [22] ,Thy proud heart's [23] and [24] to be:,Only my [25] thus far I count my gain,,That she that makes me [26] awards me [27] .`
, `In order to wash your face [1] , you must wet your [2] in warm [3] . Then, [4] it across your face [5] times. This will wash off any remainig [6] . When you are done you should [7] the cloth in [8] water to clean it. You should also wash your face with a [9] to keep it smooth and shiny. This will keep also keep away [10] . Don't worry. It is normal to experience [11] the first time you try this. Consult your [12] if you break out in [13] . This works well on your [14] too!`]
const trial = `Paste a story here with no repeated words. Then copy from console and add to storyRepo and outPut respectively`

function consolidateStory(story) {
	let lines = story.split('\n').filter(line => line.trim() !== '')
	newLines = lines.map(line => line.replace(/\s+/g, ' ').replace(/_+/g, ','));
	let outPut = [];
	let regex = /[A-Z][a-z]/g;

	for (let i = 0; i < newLines.length; i++) {
		if (regex.test(newLines[i])) {
			outPut.push(newLines.slice(i));
			newLines = newLines.slice(0, i)
			newLines = newLines.join('\n');
			outPut = outPut.join('\n');
			break; 
		}
	}

	return { newLines, outPut };
}
console.log(consolidateStory(trial));

class GenerateMadLib {
    constructor() {
        this.stories = storyRepo;
		this.rando = 0 //Math.floor(Math.random() * this.stories.length );
        this.selectedStory = this.stories[this.rando];
        console.log(this.selectedStory);
		this.result = this.analyzeStory(this.selectedStory);
    }

    analyzeStory(story) {
        const regex = /([A-Z\s""()]+)\s\[(\d+)\]/g; // will match with any capital letter, space, or parentheses, followed by a number in brackets
        let match;
        const result = {};

        while ((match = regex.exec(story)) !== null) {
            const partOfSpeech = match[1].trim();
            const number = match[2];
            result[number] = partOfSpeech;
        }

        return result;
    }

    getPartOfSpeech() {
        return this.result;
	}
}
