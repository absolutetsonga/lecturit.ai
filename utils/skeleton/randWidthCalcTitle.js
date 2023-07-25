export const randWidthCalc = () => {
    const randWidthTitle = Math.ceil(Math.random() * 5);
    const randWidthSubtitle = Math.ceil(Math.random() * 5);

    if (
        randWidthTitle === 1 ||
        randWidthSubtitle === 1 ||
        randWidthTitle <= randWidthSubtitle
    ) {
        return randWidthCalc();
    } else {
        return { randWidthTitle, randWidthSubtitle };
    }
};
