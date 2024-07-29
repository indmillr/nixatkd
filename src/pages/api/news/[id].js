import dbConnect from "../../../lib/mongoose";
import News from "../../../models/News";

export default async function handler(req, res) {
  await dbConnect();

  const { method, body, query } = req;
  const { id } = query;

  // console.log("Request body:", body);

  try {
    if (method === "PUT") {
      const { title, content, author } = body;

      const updatedNewsItem = await News.findByIdAndUpdate(
        id,
        { title, content, author },
        { new: true }
      );

      if (updatedNewsItem) {
        res.status(200).json(updatedNewsItem);
      } else {
        res.status(404).json({ message: "News item not found!" });
      }
    } else if (method === "DELETE") {
      const deletedNewsItem = await News.findByIdAndDelete(id);

      if (deletedNewsItem) {
        res.status(200).json({ message: "News item deleted!" });
      } else {
        res.status(404).json({ message: "News item not found!" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed!" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
