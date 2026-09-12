module.exports = async (req, res) => {
  try {
    const id = String(req.query.id || "");

    if (!/^\d+$/.test(id)) {
      return res.status(400).send("Invalid neuron ID");
    }

    const url =
      `https://storage.googleapis.com/flyem-male-cns/v1.0/segmentation/` +
      `skeletons-malecns/skeletons-swc/${id}.swc`;

    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .send(`Neuron ${id} could not be loaded`);
    }

    const data = await response.text();

    res.setHeader(
      "Content-Type",
      "text/plain; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=3600"
    );

    return res.status(200).send(data);

  } catch (error) {

    console.error(error);

    return res
      .status(500)
      .send("Failed to fetch neuron data");
  }
};