import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://riottitan:rjmanjdt7Sl2yCJq@cluster0.zcyskgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('database connected successfully!')
    } catch (error) {
        console.log(error);
        setTimeout(connectDB,500)
    }
}

export default connectDB
