# 🏫 BRAC University Lab Finder

<div align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen.svg" alt="Status">
  <img src="https://img.shields.io/badge/University-BRAC-orange.svg" alt="University">
</div>

<p align="center">
  <strong>🔍 Find available computer lab rooms at BRAC University with ease!</strong>
</p>

<p align="center">
  A modern, responsive web application that helps students and faculty quickly locate free lab rooms based on day and time schedules.
</p>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Technologies Used](#️-technologies-used)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [📖 Usage](#-usage)
- [🔧 Configuration](#-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Credits](#-credits)

---

## ✨ Features

### 🎯 Core Functionality
- **🗓️ Day Selection**: Choose from available weekdays (SAT-THU)
- **⏰ Time Slot Selection**: Select from 4 daily time slots (8:00 AM - 6:30 PM)
- **🔍 Manual Search**: Find free labs for specific day/time combinations
- **⚡ Real-time Search**: "Find Free Labs Now" for current time availability
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Color-coded Results**: 
  - 🟢 Green cards for available labs
  - 🔴 Red cards for occupied labs
  - 🔵 Blue cards for informational messages
- **Grid Layout**: Responsive card-based layout for easy viewing
- **Accessibility**: Proper labels and focus states for screen readers

### 📊 Data Management
- **JSON-based**: Efficient data storage and retrieval
- **CSV Conversion**: Tools for converting CSV lab schedules to JSON format
- **Python Backend**: Command-line interface for quick lab queries

---

## 🚀 Demo

### Web Interface
![Web Interface](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=BRAC+University+Lab+Finder)

### Features in Action
- 🎯 **Select your preferred day and time**
- 🔍 **Click "Find Free Labs" to see availability**
- ⚡ **Use "Find Free Labs Now" for instant current status**
- 📱 **Responsive design works on all devices**

---

## 🛠️ Technologies Used

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) **HTML5** - Structure and semantics
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) **Tailwind CSS** - Modern utility-first styling
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **Vanilla JavaScript** - Interactive functionality

### Backend/Data Processing
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) **Python 3** - Data processing and CLI interface
- ![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white) **JSON** - Data storage format

### Development Tools
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) **Git** - Version control
- ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white) **VS Code** - Development environment

---

## 📁 Project Structure

```
FreeLabFinderRaw/
├── 📄 index.html              # Main web interface
├── 📜 script.js               # JavaScript functionality
├── 🐍 main.py                 # Python CLI interface
├── 📊 CSE_Lab_Schedule.json   # Lab schedule data
├── 📁 csv to json/            # Data conversion utilities
│   ├── 📈 ConnectRoutineView.csv
│   └── 🐍 CSV_to_Json_Converter.py
└── 📖 README.md               # Project documentation
```

### 📝 File Descriptions

| File | Purpose | Technology |
|------|---------|------------|
| `index.html` | Main web application interface | HTML5, Tailwind CSS |
| `script.js` | Frontend logic and API interactions | Vanilla JavaScript |
| `main.py` | Command-line interface for lab queries | Python 3 |
| `CSE_Lab_Schedule.json` | Lab schedule database | JSON |
| `CSV_to_Json_Converter.py` | Converts CSV data to JSON format | Python 3 |

---

## ⚡ Quick Start

### 🌐 Web Application

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/AffanHossainRakib/FreeLabFinderRaw.git
   cd FreeLabFinderRaw
   ```

2. **🚀 Launch the application**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have live-server installed)
     npx live-server
     ```

3. **🎯 Access the application**
   - Direct: `file://path/to/index.html`
   - Local server: `http://localhost:8000`

### 🐍 Python CLI

1. **🏃‍♂️ Run the Python interface**
   ```bash
   python main.py
   ```

2. **🎮 Follow the prompts**
   - Select a day (0-5 for SAT-THU)
   - Select a time slot (0-3 for different time periods)
   - View available labs instantly!

---

## 📖 Usage

### 🌐 Web Interface

#### 🔍 Manual Search
1. **📅 Select Day**: Choose from dropdown (SAT, SUN, MON, TUE, WED, THU)
2. **⏰ Select Time**: Choose from available slots:
   - 8:00 AM - 11:00 AM
   - 11:00 AM - 2:00 PM  
   - 2:00 PM - 3:30 PM
   - 3:30 PM - 6:30 PM
3. **🔍 Click "Find Free Labs"**: View results in color-coded cards

#### ⚡ Real-time Search
1. **🚀 Click "Find Free Labs Now"**: Automatically detects current day/time
2. **📊 View Results**: See immediate availability status

#### 📱 Mobile Experience
- **📱 Responsive Design**: Optimized for all screen sizes
- **👆 Touch Friendly**: Large buttons and easy navigation
- **🔄 Adaptive Layout**: Grid adjusts based on screen width

### 🐍 Command Line Interface

```bash
$ python main.py

====================
Select Week Day: 
0: SAT
1: SUN
2: MON
3: TUE
4: WED
5: THU
====================
0
====================
Select Time: 
0: 8:00 AM
1: 11:00 AM
2: 2:00 PM
3: 3:30 PM
====================
0
====================
FT11-05L
FT11-06L
UB40402L
====================
```

---

## 🔧 Configuration

### 📊 Data Format

The `CSE_Lab_Schedule.json` file contains lab schedule data in the following format:

```json
{
  "Course": "CSE101-01",
  "Lab Day": "SAT",
  "Lab Time (3hr)": "8:00 AM",
  "Lab Room": "FT11-03L"
}
```

### 🔄 Updating Lab Data

1. **📈 From CSV**: Place your CSV file in `csv to json/` directory
2. **🐍 Run Converter**: 
   ```bash
   cd "csv to json"
   python CSV_to_Json_Converter.py
   ```
3. **📋 Update JSON**: Replace `CSE_Lab_Schedule.json` with the new data

### ⚙️ Customization Options

- **🎨 Styling**: Modify Tailwind classes in `index.html`
- **⏰ Time Slots**: Update time arrays in both `script.js` and `main.py`
- **📅 Days**: Modify day arrays to add/remove available days
- **🎯 Lab Rooms**: Data automatically updates from JSON file

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the issue tracker to report bugs
- Include steps to reproduce the issue
- Provide screenshots if applicable

### ✨ Feature Requests
- Open an issue with the `enhancement` label
- Describe the feature and its benefits
- Provide mockups or examples if possible

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 Development Guidelines
- Follow existing code style and conventions
- Test your changes thoroughly
- Update documentation as needed
- Keep commits atomic and well-described

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 BRAC University Lab Finder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👥 Credits

### 👨‍💻 Development Team
- **Affan Hossain Rakib** - *Lead Developer* - [@AffanHossainRakib](https://github.com/AffanHossainRakib)

### 🏫 Institution
- **BRAC University** - Computer Science and Engineering Department

### 🙏 Acknowledgments
- BRAC University CSE Department for lab schedule data
- Tailwind CSS team for the amazing styling framework
- The open-source community for inspiration and tools

---

## 📞 Contact & Support

### 📧 Get in Touch
- **GitHub Issues**: [Report bugs or request features](https://github.com/AffanHossainRakib/FreeLabFinderRaw/issues)
- **Email**: Contact the development team for questions

### 📚 Resources
- [BRAC University Official Website](https://www.bracu.ac.bd/)
- [CSE Department](https://www.bracu.ac.bd/academics/departments/computer-science-and-engineering)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<div align="center">
  <p><strong>🎓 Made with ❤️ for BRAC University Students</strong></p>
  <p><em>Last Updated: Summer 2025</em></p>
  
  <a href="#-brac-university-lab-finder">⬆️ Back to Top</a>
</div>
