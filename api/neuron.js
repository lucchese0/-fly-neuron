module.exports = async (req, res) => {
  try {
    const id = String(req.query.id || "");

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        error: "Invalid neuron ID"
      });
    }

    const url =
      "https://storage.googleapis.com/" +
      "flyem-male-cns/v1.0/segmentation/" +
      "skeletons-malecns/skeletons-precomputed/" +
      id;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Neuron ${id} could not be loaded`
      });
    }

    const buffer =
      Buffer.from(
        await response.arrayBuffer()
      );

    res.setHeader(
      "Content-Type",
      "application/octet-stream"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, immutable"
    );

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    return res.status(200).send(buffer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch neuron"
    });
  }
};