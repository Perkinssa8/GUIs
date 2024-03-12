from PyPDF2 import PdfFileReader
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LTTextBoxHorizontal

def extract_text(pdf_path, quadpoints):
    resource_manager = PDFResourceManager()
    la_params = LAParams()
    device = PDFPageAggregator(resource_manager, laparams=la_params)
    interpreter = PDFPageInterpreter(resource_manager, device)

    with open(pdf_path, 'rb') as file:
        for page in PDFPage.get_pages(file):
            interpreter.process_page(page)
            layout = device.get_result()

            for element in layout:
                if isinstance(element, LTTextBoxHorizontal):
                    x, y, text = element.bbox[0], element.bbox[1], element.get_text()
                    # Check if the text's coordinates are within the quadpoints
                    if quadpoints[0] <= x <= quadpoints[2] and quadpoints[1] <= y <= quadpoints[3]:
                        print(text)

def extract_highlights(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PdfFileReader(file)
        for page_number in range(reader.getNumPages()):
            page = reader.getPage(page_number)
            if '/Annots' in page:
                for annotation in page['/Annots']:
                    if annotation.getObject()['/Subtype'] == '/Highlight':
                        quadpoints = annotation.getObject()['/QuadPoints']
                        for i in range(0, len(quadpoints), 8):
                            # Extract the text within these quadpoints
                            extract_text(pdf_path, quadpoints[i:i+8])

# Replace 'path_to_pdf' with the path to your PDF file
extract_highlights('path_to_pdf')
# Usage example
folder_path = "C:/Users/perki/OneDrive/Documents/Apotheosis USU/Spanish Lit/Cartulera"
highlighted_text = extract_highlighted_text(folder_path)
for highlight in highlighted_text:
    print(f"Highlighted Text: {highlight['text']}")
    print(f"Highlight Color: {highlight['color']}")
    print('---')