export default () => {
    return process && process.env.USE_PURE_JS !== undefined;
}