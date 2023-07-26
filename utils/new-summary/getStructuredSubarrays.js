const getStructuredSubarrays = (transcript) => {
    const sentences = transcript.split('. ');

    let subarraysOfSentences = [];
    let currentSubarray = [];

    for (let i = 0; i <= sentences.length; i++) {
        if (i !== 0 && i % 10 === 0) {
            currentSubarray.push(sentences[i]);
            subarraysOfSentences.push(currentSubarray.join('. '));
            currentSubarray = [];
        } else {
            currentSubarray.push(sentences[i]);
        }
    }

    return subarraysOfSentences;
};

export default getStructuredSubarrays;

// input: sentences variable - array of the strings divided by dot and space (. )
// output: two dimensional array each element of the array is 10 sentences.
