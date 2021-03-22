# Cyclic Redundancy Check - Step-by-Step Division

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- ABOUT THE PROJECT -->
## About The Project

[![Cyclic Redundancy Check - Step-by-Step Division][product-screenshot]](https://github.com/quachtridat/crc-div)

This is a simple web app to simulate the process of modulo-2 division using exclusive-OR (XOR) operations on binary numbers used in Cyclic Redundancy Check (CRC).

In CRC division, numbers are "subtracted" using XOR operations. The division is used to produce an array of bits - the remainder bits `R` (of length `r`) - from two other arrays of bits `D` (data bits, of arbitrary length) and `G` (generator bits, of length `r + 1`).

The objective of the division is to find the remainder `R`, such that given `D` and `G` as described, the `DR` (the concatenation of `D` and `R`, or more formally, `D` times `2^r` plus `R`) divided by `G` equals `0`.

I started this project to reconsolidate my knowledge after learning about CRC at university (FDU Vancouver, course INFO-4102), as well as to get started with testing. There are only a few small tests written for now.

### Built With

* [Next.js](http://nextjs.org/)
* [TailwindCSS](https://tailwindcss.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Node.js](https://nodejs.org)
* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```git
   git clone https://github.com/quachtridat/crc-div.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```



<!-- USAGE EXAMPLES -->
## Usage

There are 2 panels:

* Control panel: Here you can enter the data bits and generator bits, see the number of steps, load input data and interact with the app to iterate through states and can even let the app iterate through states automatically.
* Logging panel: Here you can see the division process in action. Description of each state is shown at the bottom of this panel.

Steps:

1. Input data bits (max. 128 bits).
2. Input generator bits (max. 128 bits).
3. Click `Load` let the app load input data and generate states.
4. To operate manually, click `Next Step` to progress to the next state.
5. To let the app run automatically:
   1. Input the auto interval time length. This number (in milliseconds) indicates the time amount the app waits before progressing to the next state (if there is).
   2. Press `Auto` to start the automation.
   3. Press `Pause` at anytime to pause. Pressing `Next Step` also pauses the automation, except it also advance 1 extra step.
6. The process stops when the result is out. At this time, there is no further states, so all auto and manual functions, except for the `Load` button, are disabled.

<!-- CONTRIBUTING -->
## Contributing

This is a personal project, however I am happy that you checked this out. Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Dat Quach - [LinkedIn](https://www.linkedin.com/in/datquach) - dattriquach1702@gmail.com

Project Link: [https://github.com/quachtridat/crc-div](https://github.com/quachtridat/crc-div)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Choose an Open Source License](https://choosealicense.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/quachtridat/crc-div.svg?style=for-the-badge
[contributors-url]: https://github.com/quachtridat/crc-div/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/quachtridat/crc-div.svg?style=for-the-badge
[forks-url]: https://github.com/quachtridat/crc-div/network/members
[stars-shield]: https://img.shields.io/github/stars/quachtridat/crc-div.svg?style=for-the-badge
[stars-url]: https://github.com/quachtridat/crc-div/stargazers
[issues-shield]: https://img.shields.io/github/issues/quachtridat/crc-div.svg?style=for-the-badge
[issues-url]: https://github.com/quachtridat/crc-div/issues
[license-shield]: https://img.shields.io/github/license/quachtridat/crc-div.svg?style=for-the-badge
[license-url]: https://github.com/quachtridat/crc-div/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/datquach
[product-screenshot]: images/screenshot.png