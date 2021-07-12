[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPL License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ODEX-TOS/network_connectivity">
    <img src="https://tos.odex.be/images/logo.svg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Network Connectivity</h3>

  <p align="center">
    A wrapper used by NetworkManager to verify if the client has a network connection.
    <br />
    <br />
    <a href="https://wiki.odex.be">View wiki</a>
    ·
    <a href="https://github.com/ODEX-TOS/network_connectivity/issues">Report Bug</a>
    ·
    <a href="https://github.com/ODEX-TOS/network_connectivity/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

### Built By

- [F0xedb](https://www.odex.be)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

> This project depends on `node.js` `redis` and some `npm packages` 

### Installation

1. Clone the repo

```sh
git clone https://github.com/ODEX-TOS/network_connectivity.git
```

2. Build and run the project locally
```
docker-compose -f docker-compose-dev.yml build
docker-compose -f docker-compose-dev.yml up -d
```

3. Test that it works
```
# Should return 'NetworkManager is online'
curl http://localhost:8080/check_network_status.txt

# Open the browser with url:
xdg-open http://localhost:8080
```

<!-- ROADMAP -->

## Roadmap

See the
[open issues](https://github.com/ODEX-TOS/network_connectivity/issues) for a
list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**. First ensure you have read the [wiki](https://wiki.odex.be)
especially the [style guide](https://wiki.odex.be/Developer/style-guide) page

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

Tom Meyers - tom@odex.be

Project Link:
[https://github.com/ODEX-TOS/network_connectivity](https://github.com/ODEX-TOS/network_connectivity)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgments

- [F0xedb](https://www.odex.be)
- [TOS Homepage](https://tos.odex.be)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ODEX-TOS/network_connectivity.svg?style=flat-square
[contributors-url]: https://github.com/ODEX-TOS/network_connectivity/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ODEX-TOS/network_connectivity.svg?style=flat-square
[forks-url]: https://github.com/ODEX-TOS/network_connectivity/network/members
[stars-shield]: https://img.shields.io/github/stars/ODEX-TOS/network_connectivity.svg?style=flat-square
[stars-url]: https://github.com/ODEX-TOS/network_connectivity/stargazers
[issues-shield]: https://img.shields.io/github/issues/ODEX-TOS/network_connectivity.svg?style=flat-square
[issues-url]: https://github.com/ODEX-TOS/network_connectivity/issues
[license-shield]: https://img.shields.io/github/license/ODEX-TOS/network_connectivity.svg?style=flat-square
[license-url]: https://github.com/ODEX-TOS/network_connectivity/blob/master/LICENSE.txt
[product-screenshot]: https://tos.odex.be/images/logo.svg

