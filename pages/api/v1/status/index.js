function status(request, response) {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.status(200).json({ message: "é realmente uma benção isso aqui!" });
}

export default status;
