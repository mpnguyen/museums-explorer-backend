import Museum from '../models/museum'

export async function getMuseums(req, res) {
  try {
    const { text, limit, skip } = req.query
    const objConditions = {}
    if (text) {
      objConditions.name = new RegExp(text, 'i')
    }

    const museums = await Museum.find(objConditions)
      .limit(+limit)
      .skip(+skip)
      .exec()

    res.json({ museums, message: 'Ok' })
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message })
  }
}
