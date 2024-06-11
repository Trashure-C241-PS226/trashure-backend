import tf from "@tensorflow/tfjs-node";

async function loadModel() {
	return tf.loadLayersModel(process.env.MODEL_URL);
	// const modelUrl = "file://models/model.json";
	// return tf.loadLayersModel(modelUrl);
}

export { loadModel };
