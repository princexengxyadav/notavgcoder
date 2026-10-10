// =====================================================================
// ALL YOUR CONTENT LIVES IN THIS FILE.
// To add a subject, copy one block below and change the text.
// To add a resource, copy one { title, url, type, source } line.
//
// Allowed values for "type": "Notes", "Course", "Videos", "Practice", "Book", "Reference"
//
// IMPORTANT: Only link to resources that are free to share, and give credit
// in the "source" field. Do not copy other people's notes into this file.
// Before you publish, click every link once to make sure it still opens.
// =====================================================================

const SUBJECTS = [
  {
    id: "maths",
    name: "Mathematics",
    description: "Multivariable calculus and linear algebra.",
    // Check these units against your own syllabus and edit them.
    units: [
      {
        title: "Partial derivatives and chain rule",
        topics: ["Partial derivatives", "Chain rule for several variables", "Implicit differentiation", "Euler's theorem on homogeneous functions"]
      },
      {
        title: "Jacobians",
        topics: ["Jacobian determinant", "Change of variables", "Properties of Jacobians"]
      },
      {
        title: "Taylor series in two variables",
        topics: ["Taylor series for functions of two variables", "Maclaurin series", "Error and approximation"]
      },
      {
        title: "Maxima, minima and Lagrange multipliers",
        topics: ["Critical points", "Second derivative test", "Saddle points", "Lagrange multipliers"]
      },
      {
        title: "Multiple integrals",
        topics: ["Double integrals", "Change of order of integration", "Triple integrals", "Area and volume"]
      },
      {
        title: "Matrices and eigenvalues",
        topics: ["Rank of a matrix", "Systems of linear equations", "Eigenvalues and eigenvectors", "Cayley-Hamilton theorem"]
      }
    ],
    resources: [
      { title: "Calculus III notes", url: "https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx", type: "Notes", source: "Paul's Online Notes, Lamar University" },
      { title: "Calculus III practice problems", url: "https://tutorial.math.lamar.edu/problems/calciii/calciii.aspx", type: "Practice", source: "Paul's Online Notes, Lamar University" },
      { title: "Multivariable Calculus (18.02SC)", url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/", type: "Course", source: "MIT OpenCourseWare" },
      { title: "Linear Algebra (18.06)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", type: "Course", source: "MIT OpenCourseWare" },
      { title: "Multivariable calculus", url: "https://www.khanacademy.org/math/multivariable-calculus", type: "Course", source: "Khan Academy" },
      { title: "Essence of linear algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", type: "Videos", source: "3Blue1Brown" }
    ]
  },

  {
    id: "c",
    name: "Programming in C",
    description: "From variables to pointers and file handling.",
    units: [
      {
        title: "Basics and data types",
        topics: ["Structure of a C program", "Data types and variables", "Operators", "Input and output with printf and scanf"]
      },
      {
        title: "Control flow and loops",
        topics: ["if and else", "switch statement", "for, while and do-while loops", "break and continue"]
      },
      {
        title: "Functions and recursion",
        topics: ["Function declaration and definition", "Call by value", "Recursion", "Storage classes"]
      },
      {
        title: "Arrays and strings",
        topics: ["One-dimensional arrays", "Two-dimensional arrays", "String functions", "Passing arrays to functions"]
      },
      {
        title: "Pointers",
        topics: ["Pointer basics", "Pointer arithmetic", "Pointers and arrays", "Dynamic memory allocation"]
      },
      {
        title: "Structures and file handling",
        topics: ["Structures", "Unions", "Reading and writing files", "Command-line arguments"]
      }
    ],
    resources: [
      { title: "Beej's Guide to C Programming", url: "https://beej.us/guide/bgc/html/", type: "Book", source: "Brian Hall (Beej)" },
      { title: "C language reference", url: "https://en.cppreference.com/w/c", type: "Reference", source: "cppreference.com" },
      { title: "Learn C", url: "https://www.learn-c.org/", type: "Practice", source: "learn-c.org" },
      { title: "NPTEL courses", url: "https://nptel.ac.in/", type: "Course", source: "NPTEL, IITs and IISc" }
    ]
  },

  {
    id: "iwt",
    name: "Internet and Web Technologies",
    description: "HTML, CSS, JavaScript and how the web works.",
    units: [
      {
        title: "HTML",
        topics: ["Structure of an HTML page", "Lists and tables", "Forms and input types", "Semantic elements"]
      },
      {
        title: "CSS",
        topics: ["Selectors and specificity", "Box model", "Flexbox", "Grid", "Media queries"]
      },
      {
        title: "JavaScript basics",
        topics: ["Variables and data types", "Functions", "Arrays and objects", "Loops and conditions"]
      },
      {
        title: "DOM and events",
        topics: ["Selecting elements", "Changing content and style", "Event listeners", "Form validation"]
      },
      {
        title: "How the web works",
        topics: ["HTTP requests and responses", "Client and server", "DNS and domain names", "Hosting a website"]
      }
    ],
    resources: [
      { title: "Learn web development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", type: "Course", source: "MDN Web Docs" },
      { title: "The Modern JavaScript Tutorial", url: "https://javascript.info/", type: "Notes", source: "javascript.info" },
      { title: "Learn web.dev", url: "https://web.dev/learn", type: "Course", source: "Google" },
      { title: "freeCodeCamp curriculum", url: "https://www.freecodecamp.org/learn", type: "Practice", source: "freeCodeCamp" }
    ]
  },

  {
    id: "python",
    name: "Python",
    description: "Core Python, data structures and small projects.",
    units: [
      {
        title: "Python basics",
        topics: ["Variables and data types", "Operators", "Input and output", "Conditions and loops"]
      },
      {
        title: "Functions and modules",
        topics: ["Defining functions", "Arguments and return values", "Importing modules", "Lambda functions"]
      },
      {
        title: "Data structures",
        topics: ["Lists", "Tuples", "Dictionaries", "Sets", "List comprehensions"]
      },
      {
        title: "Files and exceptions",
        topics: ["Reading and writing files", "try and except", "Working with CSV and JSON"]
      },
      {
        title: "Object-oriented programming",
        topics: ["Classes and objects", "Inheritance", "Encapsulation", "Special methods"]
      }
    ],
    resources: [
      { title: "The Python Tutorial", url: "https://docs.python.org/3/tutorial/", type: "Notes", source: "Python Software Foundation" },
      { title: "Python standard library", url: "https://docs.python.org/3/library/", type: "Reference", source: "Python Software Foundation" },
      { title: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com/", type: "Book", source: "Al Sweigart" },
      { title: "freeCodeCamp curriculum", url: "https://www.freecodecamp.org/learn", type: "Practice", source: "freeCodeCamp" }
    ]
  }
];
