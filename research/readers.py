import os
import json


class JsonReader(object):

    def __init__(self, source="", subjects=None):
        self.subjects = subjects
        self.total_count = 0
        self.document_count = 0
        self.urls = set()
        with open(os.path.join("..", "data", source)) as file:
            self.data = json.load(file)

    def get_texts(self):

        texts = []
        for entry in self.data:
            if entry["url"] in self.urls:
                continue
            text = ""
            for paragraph_group in entry.get("paragraph_groups", []):
                text += "\n".join(paragraph_group) + " "
            if len(text):
                self.total_count += 1
                self.urls.add(entry["url"])
            for subject in self.subjects:
                if subject not in text:
                    continue
                texts.append(text)
                self.document_count += 1
                break
        return texts
