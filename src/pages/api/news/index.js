import dbConnect from "../../../lib/mongoose";
import News from "../../../models/News";

export default async function handler(req, res) {
  await dbConnect();

  const { method, body } = req;

  // console.log("Request body:", body);

  try {
    if (method === "GET") {
      const newsItems = await News.find();
      res.status(200).json(newsItems);
    } else if (method === "POST") {
      const { title, content, author } = body;

      const newNewsItem = new News({
        title,
        content,
        author,
      });

      await newNewsItem.save();
      res.status(201).json(newNewsItem);
    } else {
      res.status(405).json({ message: "Method not allowed!" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
