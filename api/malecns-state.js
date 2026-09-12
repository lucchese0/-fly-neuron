module.exports = async (req, res) => {
  try {
    const url =
      "https://storage.googleapis.com/" +
      "flyem-male-cns/v1.0/male-cns-v1.0.json";

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "MaleCNS state could not be loaded"
      });
    }

    const state = await response.json();

    res.setHeader(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=86400"
    );

    return res.status(200).json(state);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to load MaleCNS state"
    });
  }
};