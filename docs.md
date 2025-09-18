Docx files
The DocxLoader allows you to extract text data from Microsoft Word documents. It supports both the modern .docx format and the legacy .doc format. Depending on the file type, additional dependencies are required.

Setup
To use DocxLoader, you'll need the @langchain/community integration along with either mammoth or word-extractor package:

mammoth: For processing .docx files.
word-extractor: For handling .doc files.
Installation
For .docx Files
npm
Yarn
pnpm
npm install @langchain/community @langchain/core mammoth

For .doc Files
npm
Yarn
pnpm
npm install @langchain/community @langchain/core word-extractor

Usage
Loading .docx Files
For .docx files, there is no need to explicitly specify any parameters when initializing the loader:

import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

const loader = new DocxLoader(
  "src/document_loaders/tests/example_data/attention.docx"
);

const docs = await loader.load();

Loading .doc Files
For .doc files, you must explicitly specify the type as doc when initializing the loader:

import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

const loader = new DocxLoader(
  "src/document_loaders/tests/example_data/attention.doc",
  {
    type: "doc",
  }
);

const docs = await loader.load();

Was this page helpful?

------------------------------------
PDFLoader
Compatibility
Only available on Node.js.

This notebook provides a quick overview for getting started with PDFLoader document loaders. For detailed documentation of all PDFLoader features and configurations head to the API reference.

Overview
Integration details
Class	Package	Compatibility	Local	PY support
PDFLoader	@langchain/community	Node-only	✅	🟠 (See note below)
Setup
To access PDFLoader document loader you’ll need to install the @langchain/community integration, along with the pdf-parse package.

Credentials
Installation
The LangChain PDFLoader integration lives in the @langchain/community package:

tip
See this section for general instructions on installing integration packages.

npm
yarn
pnpm
npm i @langchain/community @langchain/core pdf-parse

Instantiation
Now we can instantiate our model object and load documents:

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const nike10kPdfPath = "../../../../data/nke-10k-2023.pdf";

const loader = new PDFLoader(nike10kPdfPath);

Load
const docs = await loader.load();
docs[0];

Document {
  pageContent: 'Table of Contents\n' +
    'UNITED STATES\n' +
    'SECURITIES AND EXCHANGE COMMISSION\n' +
    'Washington, D.C. 20549\n' +
    'FORM 10-K\n' +
    '(Mark One)\n' +
    '☑ ANNUAL REPORT PURSUANT TO SECTION 13 OR 15(D) OF THE SECURITIES EXCHANGE ACT OF 1934\n' +
    'FOR THE FISCAL YEAR ENDED MAY 31, 2023\n' +
    'OR\n' +
    '☐ TRANSITION REPORT PURSUANT TO SECTION 13 OR 15(D) OF THE SECURITIES EXCHANGE ACT OF 1934\n' +
    'FOR THE TRANSITION PERIOD FROM                         TO                         .\n' +
    'Commission File No. 1-10635\n' +
    'NIKE, Inc.\n' +
    '(Exact name of Registrant as specified in its charter)\n' +
    'Oregon93-0584541\n' +
    '(State or other jurisdiction of incorporation)(IRS Employer Identification No.)\n' +
    'One Bowerman Drive, Beaverton, Oregon 97005-6453\n' +
    '(Address of principal executive offices and zip code)\n' +
    '(503) 671-6453\n' +
    "(Registrant's telephone number, including area code)\n" +
    'SECURITIES REGISTERED PURSUANT TO SECTION 12(B) OF THE ACT:\n' +
    'Class B Common StockNKENew York Stock Exchange\n' +
    '(Title of each class)(Trading symbol)(Name of each exchange on which registered)\n' +
    'SECURITIES REGISTERED PURSUANT TO SECTION 12(G) OF THE ACT:\n' +
    'NONE\n' +
    'Indicate by check mark:YESNO\n' +
    '•if the registrant is a well-known seasoned issuer, as defined in Rule 405 of the Securities Act.þ ̈\n' +
    '•if the registrant is not required to file reports pursuant to Section 13 or Section 15(d) of the Act. ̈þ\n' +
    '•whether the registrant (1) has filed all reports required to be filed by Section 13 or 15(d) of the Securities Exchange Act of 1934 during the preceding\n' +
    '12 months (or for such shorter period that the registrant was required to file such reports), and (2) has been subject to such filing requirements for the\n' +
    'past 90 days.\n' +
    'þ ̈\n' +
    '•whether the registrant has submitted electronically every Interactive Data File required to be submitted pursuant to Rule 405 of Regulation S-T\n' +
    '(§232.405 of this chapter) during the preceding 12 months (or for such shorter period that the registrant was required to submit such files).\n' +
    'þ ̈\n' +
    '•whether the registrant is a large accelerated filer, an accelerated filer, a non-accelerated filer, a smaller reporting company or an emerging growth company. See the definitions of “large accelerated filer,”\n' +
    '“accelerated filer,” “smaller reporting company,” and “emerging growth company” in Rule 12b-2 of the Exchange Act.\n' +
    'Large accelerated filerþAccelerated filer☐Non-accelerated filer☐Smaller reporting company☐Emerging growth company☐\n' +
    '•if an emerging growth company, if the registrant has elected not to use the extended transition period for complying with any new or revised financial\n' +
    'accounting standards provided pursuant to Section 13(a) of the Exchange Act.\n' +
    ' ̈\n' +
    "•whether the registrant has filed a report on and attestation to its management's assessment of the effectiveness of its internal control over financial\n" +
    'reporting under Section 404(b) of the Sarbanes-Oxley Act (15 U.S.C. 7262(b)) by the registered public accounting firm that prepared or issued its audit\n' +
    'report.\n' +
    'þ\n' +
    '•if securities are registered pursuant to Section 12(b) of the Act, whether the financial statements of the registrant included in the filing reflect the\n' +
    'correction of an error to previously issued financial statements.\n' +
    ' ̈\n' +
    '•whether any of those error corrections are restatements that required a recovery analysis of incentive-based compensation received by any of the\n' +
    "registrant's executive officers during the relevant recovery period pursuant to § 240.10D-1(b).\n" +
    ' ̈\n' +
    '•\n' +
    'whether the registrant is a shell company (as defined in Rule 12b-2 of the Act).☐þ\n' +
    "As of November 30, 2022, the aggregate market values of the Registrant's Common Stock held by non-affiliates were:\n" +
    'Class A$7,831,564,572 \n' +
    'Class B136,467,702,472 \n' +
    '$144,299,267,044 ',
  metadata: {
    source: '../../../../data/nke-10k-2023.pdf',
    pdf: {
      version: '1.10.100',
      info: [Object],
      metadata: null,
      totalPages: 107
    },
    loc: { pageNumber: 1 }
  },
  id: undefined
}


console.log(docs[0].metadata);

{
  source: '../../../../data/nke-10k-2023.pdf',
  pdf: {
    version: '1.10.100',
    info: {
      PDFFormatVersion: '1.4',
      IsAcroFormPresent: false,
      IsXFAPresent: false,
      Title: '0000320187-23-000039',
      Author: 'EDGAR Online, a division of Donnelley Financial Solutions',
      Subject: 'Form 10-K filed on 2023-07-20 for the period ending 2023-05-31',
      Keywords: '0000320187-23-000039; ; 10-K',
      Creator: 'EDGAR Filing HTML Converter',
      Producer: 'EDGRpdf Service w/ EO.Pdf 22.0.40.0',
      CreationDate: "D:20230720162200-04'00'",
      ModDate: "D:20230720162208-04'00'"
    },
    metadata: null,
    totalPages: 107
  },
  loc: { pageNumber: 1 }
}

Usage, one document per file
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const singleDocPerFileLoader = new PDFLoader(nike10kPdfPath, {
  splitPages: false,
});

const singleDoc = await singleDocPerFileLoader.load();
console.log(singleDoc[0].pageContent.slice(0, 100));

Table of Contents
UNITED STATES
SECURITIES AND EXCHANGE COMMISSION
Washington, D.C. 20549
FORM 10-K

Usage, custom pdfjs build
By default we use the pdfjs build bundled with pdf-parse, which is compatible with most environments, including Node.js and modern browsers. If you want to use a more recent version of pdfjs-dist or if you want to use a custom build of pdfjs-dist, you can do so by providing a custom pdfjs function that returns a promise that resolves to the PDFJS object.

In the following example we use the “legacy” (see pdfjs docs) build of pdfjs-dist, which includes several polyfills not included in the default build.

npm
yarn
pnpm
npm i pdfjs-dist

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const customBuildLoader = new PDFLoader(nike10kPdfPath, {
  // you may need to add `.then(m => m.default)` to the end of the import
  pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
});

Eliminating extra spaces
PDFs come in many varieties, which makes reading them a challenge. The loader parses individual text elements and joins them together with a space by default, but if you are seeing excessive spaces, this may not be the desired behavior. In that case, you can override the separator with an empty string like this:

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const noExtraSpacesLoader = new PDFLoader(nike10kPdfPath, {
  parsedItemSeparator: "",
});

const noExtraSpacesDocs = await noExtraSpacesLoader.load();
console.log(noExtraSpacesDocs[0].pageContent.slice(100, 250));

(Mark One)
☑ ANNUAL REPORT PURSUANT TO SECTION 13 OR 15(D) OF THE SECURITIES EXCHANGE ACT OF 1934
FOR THE FISCAL YEAR ENDED MAY 31, 2023
OR
☐ TRANSITI

Loading directories
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const exampleDataPath =
  "../../../../../../examples/src/document_loaders/example_data/";

/* Load all PDFs within the specified directory */
const directoryLoader = new DirectoryLoader(exampleDataPath, {
  ".pdf": (path: string) => new PDFLoader(path),
});

const directoryDocs = await directoryLoader.load();

console.log(directoryDocs[0]);

/* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splitDocs = await textSplitter.splitDocuments(directoryDocs);
console.log(splitDocs[0]);


Unknown file type: Star_Wars_The_Clone_Wars_S06E07_Crisis_at_the_Heart.srt
Unknown file type: example.txt
Unknown file type: notion.md
Unknown file type: bad_frontmatter.md
Unknown file type: frontmatter.md
Unknown file type: no_frontmatter.md
Unknown file type: no_metadata.md
Unknown file type: tags_and_frontmatter.md
Unknown file type: test.mp3

Document {
  pageContent: 'Bitcoin: A Peer-to-Peer Electronic Cash System\n' +
    'Satoshi Nakamoto\n' +
    'satoshin@gmx.com\n' +
    'www.bitcoin.org\n' +
    'Abstract.   A  purely   peer-to-peer   version   of   electronic   cash   would   allow   online \n' +
    'payments   to   be   sent   directly   from   one   party   to   another   without   going   through   a \n' +
    'financial institution.   Digital signatures provide part of the solution, but the main \n' +
    'benefits are lost if a trusted third party is still required to prevent double-spending. \n' +
    'We propose a solution to the double-spending problem using a peer-to-peer network. \n' +
    'The   network   timestamps   transactions   by   hashing   them   into   an   ongoing   chain   of \n' +
    'hash-based proof-of-work, forming a record that cannot be changed without redoing \n' +
    'the proof-of-work.   The longest chain not only serves as proof of the sequence of \n' +
    'events witnessed, but proof that it came from the largest pool of CPU power.   As \n' +
    'long as a majority of CPU power is controlled by nodes that are not cooperating to \n' +
    "attack the network,  they'll  generate the  longest  chain  and  outpace attackers.   The \n" +
    'network itself requires minimal structure.   Messages are broadcast on a best effort \n' +
    'basis,   and   nodes   can   leave   and   rejoin   the   network   at   will,   accepting   the   longest \n' +
    'proof-of-work chain as proof of what happened while they were gone.\n' +
    '1.Introduction\n' +
    'Commerce on the Internet has come to rely almost exclusively on financial institutions serving as \n' +
    'trusted third  parties  to process electronic payments.   While the  system works  well enough for \n' +
    'most   transactions,   it   still   suffers   from   the   inherent   weaknesses   of   the   trust   based   model. \n' +
    'Completely non-reversible transactions are not really possible, since financial institutions cannot \n' +
    'avoid   mediating   disputes.     The   cost   of   mediation   increases   transaction   costs,   limiting   the \n' +
    'minimum practical transaction size and cutting off the possibility for small casual transactions, \n' +
    'and   there   is   a   broader   cost   in   the   loss   of   ability   to   make   non-reversible   payments   for   non-\n' +
    'reversible services.  With the possibility of reversal, the need for trust spreads.  Merchants must \n' +
    'be wary of their customers, hassling them for more information than they would otherwise need. \n' +
    'A certain percentage of fraud is accepted as unavoidable.  These costs and payment uncertainties \n' +
    'can be avoided in person by using physical currency, but no mechanism exists to make payments \n' +
    'over a communications channel without a trusted party.\n' +
    'What is needed is an electronic payment system based on cryptographic proof instead of trust, \n' +
    'allowing any two willing parties to transact directly with each other without the need for a trusted \n' +
    'third  party.    Transactions  that  are  computationally  impractical  to   reverse   would  protect  sellers \n' +
    'from fraud, and routine escrow mechanisms could easily be implemented to protect buyers.   In \n' +
    'this paper, we propose a solution to the double-spending problem using a peer-to-peer distributed \n' +
    'timestamp server to generate computational proof of the chronological order of transactions.  The \n' +
    'system   is   secure   as   long   as   honest   nodes   collectively   control   more   CPU   power   than   any \n' +
    'cooperating group of attacker nodes.\n' +
    '1',
  metadata: {
    source: '/Users/bracesproul/code/lang-chain-ai/langchainjs/examples/src/document_loaders/example_data/bitcoin.pdf',
    pdf: {
      version: '1.10.100',
      info: [Object],
      metadata: null,
      totalPages: 9
    },
    loc: { pageNumber: 1 }
  },
  id: undefined
}
Document {
  pageContent: 'Bitcoin: A Peer-to-Peer Electronic Cash System\n' +
    'Satoshi Nakamoto\n' +
    'satoshin@gmx.com\n' +
    'www.bitcoin.org\n' +
    'Abstract.   A  purely   peer-to-peer   version   of   electronic   cash   would   allow   online \n' +
    'payments   to   be   sent   directly   from   one   party   to   another   without   going   through   a \n' +
    'financial institution.   Digital signatures provide part of the solution, but the main \n' +
    'benefits are lost if a trusted third party is still required to prevent double-spending. \n' +
    'We propose a solution to the double-spending problem using a peer-to-peer network. \n' +
    'The   network   timestamps   transactions   by   hashing   them   into   an   ongoing   chain   of \n' +
    'hash-based proof-of-work, forming a record that cannot be changed without redoing \n' +
    'the proof-of-work.   The longest chain not only serves as proof of the sequence of \n' +
    'events witnessed, but proof that it came from the largest pool of CPU power.   As \n' +
    'long as a majority of CPU power is controlled by nodes that are not cooperating to',
  metadata: {
    source: '/Users/bracesproul/code/lang-chain-ai/langchainjs/examples/src/document_loaders/example_data/bitcoin.pdf',
    pdf: {
      version: '1.10.100',
      info: [Object],
      metadata: null,
      totalPages: 9
    },
    loc: { pageNumber: 1, lines: [Object] }
  },
  id: undefined
}


API reference
For detailed documentation of all PDFLoader features and configurations head to the API reference: https://api.js.langchain.com/classes/langchain_community_document_loaders_fs_pdf.PDFLoader.html

-----------------------
PPTX files
This example goes over how to load data from PPTX files. By default, one document will be created for all pages in the PPTX file.

Setup
npm
Yarn
pnpm
npm install officeparser

Usage, one document per page
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

const loader = new PPTXLoader("src/document_loaders/example_data/example.pptx");

const docs = await loader.load();

Was this page helpful?
-----------------------------------
TextLoader
Compatibility
Only available on Node.js.

This notebook provides a quick overview for getting started with TextLoader document loaders. For detailed documentation of all TextLoader features and configurations head to the API reference.

Overview
Integration details
Class	Package	Compatibility	Local	PY support
TextLoader	langchain	Node-only	✅	❌
Setup
To access TextLoader document loader you’ll need to install the langchain package.

Installation
The LangChain TextLoader integration lives in the langchain package:

tip
See this section for general instructions on installing integration packages.

npm
yarn
pnpm
npm i langchain

Instantiation
Now we can instantiate our model object and load documents:

import { TextLoader } from "langchain/document_loaders/fs/text";

const loader = new TextLoader(
  "../../../../../../examples/src/document_loaders/example_data/example.txt"
);

Load
const docs = await loader.load();
docs[0];

Document {
  pageContent: 'Foo\nBar\nBaz\n\n',
  metadata: {
    source: '../../../../../../examples/src/document_loaders/example_data/example.txt'
  },
  id: undefined
}

console.log(docs[0].metadata);

{
  source: '../../../../../../examples/src/document_loaders/example_data/example.txt'
}

API reference
For detailed documentation of all TextLoader features and configurations head to the API reference: https://api.js.langchain.com/classes/langchain.document_loaders_fs_text.TextLoader.html

Was this page helpful?
--------------------------


import { MultiFileLoader } from "langchain/document_loaders/fs/multi_file";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

const loader = new MultiFileLoader(
  [
    "src/document_loaders/example_data/example/example.txt",
    "src/document_loaders/example_data/example/example.csv",
    "src/document_loaders/example_data/example2/example.json",
    "src/document_loaders/example_data/example2/example.jsonl",
  ],
  {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
  }
);
const docs = await loader.load();
console.log({ docs });
-----------------------------------
CSVLoader
Compatibility
Only available on Node.js.

This notebook provides a quick overview for getting started with CSVLoader document loaders. For detailed documentation of all CSVLoader features and configurations head to the API reference.

This example goes over how to load data from CSV files. The second argument is the column name to extract from the CSV file. One document will be created for each row in the CSV file. When column is not specified, each row is converted into a key/value pair with each key/value pair outputted to a new line in the document’s pageContent. When column is specified, one document is created for each row, and the value of the specified column is used as the document’s pageContent.

Overview
Integration details
Class	Package	Compatibility	Local	PY support
CSVLoader	@langchain/community	Node-only	✅	✅
Setup
To access CSVLoader document loader you’ll need to install the @langchain/community integration, along with the d3-dsv@2 peer dependency.

Installation
The LangChain CSVLoader integration lives in the @langchain/community integration package.

tip
See this section for general instructions on installing integration packages.

npm
yarn
pnpm
npm i @langchain/community @langchain/core d3-dsv@2

Instantiation
Now we can instantiate our model object and load documents:

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

const exampleCsvPath =
  "../../../../../../langchain/src/document_loaders/tests/example_data/example_separator.csv";

const loader = new CSVLoader(exampleCsvPath);

Load
const docs = await loader.load();
docs[0];

Document {
  pageContent: 'id｜html: 1｜"<i>Corruption discovered at the core of the Banking Clan!</i>"',
  metadata: {
    source: '../../../../../../langchain/src/document_loaders/tests/example_data/example_separator.csv',
    line: 1
  },
  id: undefined
}

console.log(docs[0].metadata);

{
  source: '../../../../../../langchain/src/document_loaders/tests/example_data/example_separator.csv',
  line: 1
}

Usage, extracting a single column
Example CSV file:

id｜html
1｜"<i>Corruption discovered at the core of the Banking Clan!</i>"
2｜"<i>Reunited, Rush Clovis and Senator Amidala</i>"
3｜"<i>discover the full extent of the deception.</i>"
4｜"<i>Anakin Skywalker is sent to the rescue!</i>"

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

const singleColumnLoader = new CSVLoader(exampleCsvPath, {
  column: "html",
  separator: "｜",
});

const singleColumnDocs = await singleColumnLoader.load();
console.log(singleColumnDocs[0]);

Document {
  pageContent: '<i>Corruption discovered at the core of the Banking Clan!</i>',
  metadata: {
    source: '../../../../../../langchain/src/document_loaders/tests/example_data/example_separator.csv',
    line: 1
  },
  id: undefined
}

API reference
For detailed documentation of all CSVLoader features and configurations head to the API reference: https://api.js.langchain.com/classes/langchain_community_document_loaders_fs_csv.CSVLoader.html

---------------------------------------
JSON files
The JSON loader use JSON pointer to target keys in your JSON files you want to target.

No JSON pointer example
The most simple way of using it, is to specify no JSON pointer. The loader will load all strings it finds in the JSON object.

Example JSON file:

{
  "texts": ["This is a sentence.", "This is another sentence."]
}

Example code:

import { JSONLoader } from "langchain/document_loaders/fs/json";

const loader = new JSONLoader("src/document_loaders/example_data/example.json");

const docs = await loader.load();
/*
[
  Document {
    "metadata": {
      "blobType": "application/json",
      "line": 1,
      "source": "blob",
    },
    "pageContent": "This is a sentence.",
  },
  Document {
    "metadata": {
      "blobType": "application/json",
      "line": 2,
      "source": "blob",
    },
    "pageContent": "This is another sentence.",
  },
]
*/

Using JSON pointer example
You can do a more advanced scenario by choosing which keys in your JSON object you want to extract string from.

In this example, we want to only extract information from "from" and "surname" entries.

{
  "1": {
    "body": "BD 2023 SUMMER",
    "from": "LinkedIn Job",
    "labels": ["IMPORTANT", "CATEGORY_UPDATES", "INBOX"]
  },
  "2": {
    "body": "Intern, Treasury and other roles are available",
    "from": "LinkedIn Job2",
    "labels": ["IMPORTANT"],
    "other": {
      "name": "plop",
      "surname": "bob"
    }
  }
}

Example code:

import { JSONLoader } from "langchain/document_loaders/fs/json";

const loader = new JSONLoader(
  "src/document_loaders/example_data/example.json",
  ["/from", "/surname"]
);

const docs = await loader.load();
/*
[
  Document {
    "metadata": {
      "blobType": "application/json",
      "line": 1,
      "source": "blob",
    },
    "pageContent": "BD 2023 SUMMER",
  },
  Document {
    "metadata": {
      "blobType": "application/json",
      "line": 2,
      "source": "blob",
    },
    "pageContent": "LinkedIn Job",
  },
  ...
]

Was this page helpful?

You can also leave detailed feedback on GitHub.
-----------------------
SupabaseVectorStore
Supabase is an open-source Firebase alternative. Supabase is built on top of PostgreSQL, which offers strong SQL querying capabilities and enables a simple interface with already-existing tools and frameworks.

LangChain.js supports using a Supabase Postgres database as a vector store, using the pgvector extension. Refer to the Supabase blog post for more information.

This guide provides a quick overview for getting started with Supabase vector stores. For detailed documentation of all SupabaseVectorStore features and configurations head to the API reference.

Overview
Integration details
Class	Package	PY support	Package latest
SupabaseVectorStore	@langchain/community	✅	NPM - Version
Setup
To use Supabase vector stores, you’ll need to set up a Supabase database and install the @langchain/community integration package. You’ll also need to install the official @supabase/supabase-js SDK as a peer dependency.

This guide will also use OpenAI embeddings, which require you to install the @langchain/openai integration package. You can also use other supported embeddings models if you wish.

tip
See this section for general instructions on installing integration packages.

npm
yarn
pnpm
npm i @langchain/community @langchain/core @supabase/supabase-js @langchain/openai

Once you’ve created a database, run the following SQL to set up pgvector and create the necessary table and functions:

-- Enable the pgvector extension to work with embedding vectors
create extension vector;

-- Create a table to store your documents
create table documents (
  id bigserial primary key,
  content text, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
);

-- Create a function to search for documents
create function match_documents (
  query_embedding vector(1536),
  match_count int DEFAULT null,
  filter jsonb DEFAULT '{}'
) returns table (
  id bigint,
  content text,
  metadata jsonb,
  embedding jsonb,
  similarity float
)
language plpgsql
as $$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    (embedding::text)::jsonb as embedding,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

Credentials
Once you’ve done this set the SUPABASE_PRIVATE_KEY and SUPABASE_URL environment variables:

process.env.SUPABASE_PRIVATE_KEY = "your-api-key";
process.env.SUPABASE_URL = "your-supabase-db-url";

If you are using OpenAI embeddings for this guide, you’ll need to set your OpenAI key as well:

process.env.OPENAI_API_KEY = "YOUR_API_KEY";

If you want to get automated tracing of your model calls you can also set your LangSmith API key by uncommenting below:

// process.env.LANGSMITH_TRACING="true"
// process.env.LANGSMITH_API_KEY="your-api-key"

Instantiation
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

import { createClient } from "@supabase/supabase-js";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PRIVATE_KEY
);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents",
  queryName: "match_documents",
});

Manage vector store
Add items to vector store
import type { Document } from "@langchain/core/documents";

const document1: Document = {
  pageContent: "The powerhouse of the cell is the mitochondria",
  metadata: { source: "https://example.com" },
};

const document2: Document = {
  pageContent: "Buildings are made out of brick",
  metadata: { source: "https://example.com" },
};

const document3: Document = {
  pageContent: "Mitochondria are made out of lipids",
  metadata: { source: "https://example.com" },
};

const document4: Document = {
  pageContent: "The 2024 Olympics are in Paris",
  metadata: { source: "https://example.com" },
};

const documents = [document1, document2, document3, document4];

await vectorStore.addDocuments(documents, { ids: ["1", "2", "3", "4"] });

[ 1, 2, 3, 4 ]

Delete items from vector store
await vectorStore.delete({ ids: ["4"] });

Query vector store
Once your vector store has been created and the relevant documents have been added you will most likely wish to query it during the running of your chain or agent.

Query directly
Performing a simple similarity search can be done as follows:

const filter = { source: "https://example.com" };

const similaritySearchResults = await vectorStore.similaritySearch(
  "biology",
  2,
  filter
);

for (const doc of similaritySearchResults) {
  console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
}

* The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* Mitochondria are made out of lipids [{"source":"https://example.com"}]

If you want to execute a similarity search and receive the corresponding scores you can run:

const similaritySearchWithScoreResults =
  await vectorStore.similaritySearchWithScore("biology", 2, filter);

for (const [doc, score] of similaritySearchWithScoreResults) {
  console.log(
    `* [SIM=${score.toFixed(3)}] ${doc.pageContent} [${JSON.stringify(
      doc.metadata
    )}]`
  );
}

* [SIM=0.165] The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* [SIM=0.148] Mitochondria are made out of lipids [{"source":"https://example.com"}]

Metadata Query Builder Filtering
You can also use query builder-style filtering similar to how the Supabase JavaScript library works instead of passing an object. Note that since most of the filter properties are in the metadata column, you need to use arrow operators (-> for integer or ->> for text) as defined in Postgrest API documentation and specify the data type of the property (e.g. the column should look something like metadata->some_int_prop_name::int).

import { SupabaseFilterRPCCall } from "@langchain/community/vectorstores/supabase";

const funcFilter: SupabaseFilterRPCCall = (rpc) =>
  rpc.filter("metadata->>source", "eq", "https://example.com");

const funcFilterSearchResults = await vectorStore.similaritySearch(
  "biology",
  2,
  funcFilter
);

for (const doc of funcFilterSearchResults) {
  console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
}

* The powerhouse of the cell is the mitochondria [{"source":"https://example.com"}]
* Mitochondria are made out of lipids [{"source":"https://example.com"}]

Query by turning into retriever
You can also transform the vector store into a retriever for easier usage in your chains.

const retriever = vectorStore.asRetriever({
  // Optional filter
  filter: filter,
  k: 2,
});
await retriever.invoke("biology");

[
  Document {
    pageContent: 'The powerhouse of the cell is the mitochondria',
    metadata: { source: 'https://example.com' },
    id: undefined
  },
  Document {
    pageContent: 'Mitochondria are made out of lipids',
    metadata: { source: 'https://example.com' },
    id: undefined
  }
]

Usage for retrieval-augmented generation
For guides on how to use this vector store for retrieval-augmented generation (RAG), see the following sections:

Tutorials: working with external knowledge.
How-to: Question and answer with RAG
Retrieval conceptual docs
API reference
For detailed documentation of all SupabaseVectorStore features and configurations head to the API reference.

Related
Vector store conceptual guide
Vector store how-to guides