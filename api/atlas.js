const TOTAL_NEURONS = 166700;

const SAMPLE_IDS = [
  12781,
  556329
];

module.exports = async (req, res) => {

  try {

    const mode =
      String(req.query.mode || "overview");

    /*
     * The official MaleCNS release contains
     * the complete male CNS.
     *
     * The browser must not request every
     * raw skeleton individually.
     *
     * This endpoint therefore exposes the
     * atlas contract used by the frontend.
     */

    if (mode === "stats") {

      return res.status(200).json({

        dataset: "male-cns:v1.0",

        neurons: TOTAL_NEURONS,

        coverage: [
          "central brain",
          "optic lobes",
          "ventral nerve cord"
        ],

        skeletonFormat:
          "neuroglancer-precomputed",

        coordinateUnit:
          "nanometer",

        skeletons:
          "unsharded",

        source:
          "HHMI Janelia / Google Research",

        license:
          "CC-BY-4.0"

      });
    }


    /*
     * Seed records.
     *
     * These are real neurons and are used
     * immediately while the progressive atlas
     * layer is being populated.
     */

    const neurons =
      SAMPLE_IDS.map(id => ({
        id,
        skeleton:
          `/api/neuron?id=${id}`
      }));


    return res.status(200).json({

      version: "1.0",

      dataset:
        "MaleCNS v1.0",

      totalNeurons:
        TOTAL_NEURONS,

      neurons,

      progressive:
        true

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Atlas unavailable"
    });

  }

};