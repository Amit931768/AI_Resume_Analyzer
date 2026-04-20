from flask import Flask, render_template, request, send_file
import PyPDF2
import os
import uuid

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

skills_db = [
    "html","css","javascript","python","sql",
    "react","node","java","c++","flask",
    "django","mongodb","firebase","git"
]

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    file = request.files["resume"]

    # unique filename (overwrite problem avoid)
    filename = str(uuid.uuid4()) + ".pdf"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    text = ""

    with open(filepath, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)

        for page in reader.pages:
            if page.extract_text():
                text += page.extract_text()

    text = text.lower()

    found_skills = []

    for skill in skills_db:
        if skill in text:
            found_skills.append(skill)

    score = int((len(found_skills) / len(skills_db)) * 100)
    missing_skills = list(set(skills_db) - set(found_skills))

    return render_template(
        "index.html",
        score=score,
        found=found_skills,
        missing=missing_skills,
        filename=filename   # 👈 download ke liye
    )


# 🔥 DOWNLOAD ROUTE
@app.route("/download/<filename>")
def download_file(filename):
    path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    return send_file(path, as_attachment=True)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)