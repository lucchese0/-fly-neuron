module.exports = async (req, res) => {
  try {
    const id = String(req.query.id || "");

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid neuron ID");
    }

    const url =
      "https://storage.googleapis.com/" +
      "flyem-male-cns/v1.0/segmentation/" +
      "skeletons-malecns/skeletons-precomputed/" +
      id;

    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .send(`Neuron ${id} could not be loaded`);
    }

    const buffer = await response.arrayBuffer();

    res.setHeader(
      "Content-Type",
      "application/octet-stream"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, immutable"
    );

    return res.status(200).send(Buffer.from(buffer));

  } catch (error) {

    console.error(error);

    return res
      .status(500)
      .send("Failed to fetch precomputed neuron");
  }
};