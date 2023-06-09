import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  mongoose.set('strict', true)

  if (isConnected) {
    console.log('Mongoose is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'shared_prompt',
      // useNewUrlParser: true,
      // useUnifieldTopology: true,
    })

    isConnected = true
    console.log('Mongoose is connected')
  } catch (err) {
    console.log(err)
  }
}
