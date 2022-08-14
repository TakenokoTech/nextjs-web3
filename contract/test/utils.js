const catching = async (promise) => {
    try {
        return await promise
    }
    catch (err) {
        return err
    }
}

module.exports = { catching };