export const randWidthCalc = () => {
    const randWidthTitle = Math.ceil(Math.random() * 6);
    const randWidthSubtitle = Math.ceil(Math.random() * 6);

    if (
        randWidthTitle >= randWidthSubtitle ||
        randWidthTitle === 1 ||
        randWidthSubtitle === 1
    ) {
        return randWidthCalc();
    } else {
        return { randWidthTitle, randWidthSubtitle };
    }
};
