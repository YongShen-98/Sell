import React from "react";
import { createRoot } from "react-dom/client";
import { Button, ButtonToolbar } from "rsuite";
import { Navbar, Nav } from 'rsuite';
import { Container, Header, Content, Footer, Sidebar, Divider, Input, InputGroup, MaskedInput } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { ethers } from "ethers";
import { sell_address, sell_abi } from "./ethereum/sell";
import { dutch_address, dutch_abi } from "./ethereum/dutch";
import { english_address, english_abi } from "./ethereum/english";

const style3 = {
  padding: 20,
  textAlign: "center"
}

function App() {
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      console.log(window.ethereum)
      await window.ethereum.request({ method: "eth_requestAccounts" })
      document.getElementById("connectbutton").innerHTML = "You have connected !"
    } else {
      console.log("Please install metamask")
    }
  }
  const getPrice = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(sell_address, sell_abi, signer)

    const price = await contract.getPrice()

    alert('The price of CKGSB NFT is : ' + price / 1000000000000000000 + ' RVT')
  }

  const buySell = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(sell_address, sell_abi, signer)
    await contract.buy()
  }

  const startdutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)
    await contract.start()
  }

  const getPriceDutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    const resp0 = await contract.startAt()
    if (resp0 == 0) {
      alert("You can not get the price !")
    } else {
      const startPrice = await contract.startingPrice()
      const startTime = await contract.startAt()
      const discountRate = await contract.discountRate()
      const price = startPrice - 10 * discountRate * (Date.parse(new Date())/1000 - startTime)
      alert("The price is " + price / 1000000000000000000 + " RVT")
    }
  }

  const getAddressNFT = async () => {
    alert("0x0285c4727C5903ccfbc42349AFd2Ce74B68FA98e")
  }

  const getIdsell = async () => {
    alert(0)
  }
  const getIddutch = async () => {
    alert(1)
  }
  const getIdenglish = async () => {
    alert(2)
  }


  const ifStart = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    const resp = await contract.startAt()

    if (resp == 0) {
      alert("It has not started !")
    } else {
      alert("It has started !")
    }
  }

  const Isend = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)
    var timestamp = Date.parse(new Date())

    const resp = await contract.expiresAt()
    
    if (resp == 0) {
      alert("It has ended and the new Dutch-Auction has not started !")
    } else {
      alert(resp - timestamp / 1000)
    }
  }

  const buyDutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)
    const resp0 = await contract.startAt()
    if (resp0 == 0) {
      alert("You can not bid it !")
    } else {
      await contract.buy()
    }
  }

  const startenglish = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)
    await contract.start()
  }

  const endenglish = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)
    await contract.end()
  }

  const bid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)

    const num = document.getElementById('bidnumber').value
    await contract.bid(num)
  }

  const highestBidder = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)

    const resp = await contract.highestBidder()

    alert(resp)
  }

  const highestBid = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)

    const resp = await contract.highestBid()

    alert(resp / 10 ** 18)
  }

  const Isstart = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)
    const resp = await contract.started()
    if (resp == false) {
      alert("It has not started !")
    } else {
      alert("It has started !")
    }
  }

  const getcurrentTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)
    const resp1 = await contract.endAt()
    var timestamp = Date.parse(new Date())

    if (resp1 == 0) {
      alert("It has not started !")
    } else if (resp1 > timestamp / 1000) {
      alert(resp1 - timestamp / 1000)
    } else {
      alert("It has ended !")
    }
  }

  const goto = async () => {
    window.location.href="https://yongshen-98.github.io/Token-ERC-20/";
  }

  const selladdress = async () => {
    alert("the address of Simple-Sell is 0xcC85CCCc205eD7B101f2Cdc6dD4aa40FfE7A97F1")
  }

  const dutchaddress = async () => {
    alert("the address of Dutch-Auction is 0xaA21eF9F36cf7B50d0Fc1e05A038D38263296375")
  }

  const Englishaddress = async () => {
    alert("the address of English-Auction is 0xDFadE6a443E00197f3a9274c1C4C8ce75aBB9c53")
  }

  return (
    <div>
      <Navbar>
      <Nav>
        <Nav. Item onClick={goto}>https://yongshen-98.github.io/Token-ERC-20/</Nav. Item>
        <Nav. Item onClick={selladdress}>Simple-Sell</Nav. Item>
        <Nav. Item onClick={dutchaddress}>Dutch-Auction</Nav. Item>
        <Nav. Item onClick={Englishaddress}>English-Auction</Nav. Item>
      </Nav>
        <Button color="blue" appearance="primary" style={{ marginLeft: 100 }} onClick={getAddressNFT}><h3>The address of NFT</h3></Button>
        <Nav pullRight>
          <Nav.Item><Button color="violet" appearance="primary" id="connectbutton" onClick={connectWallet}>Connect Button</Button></Nav.Item>
        </Nav>
      </Navbar>
      <Container>
        <Sidebar>
          <img src={require('./images/ChangJiang.png')} style={{ width: 200, height: 200 }} />
          <img src={require('./images/ChangJiang.png')} style={{ width: 200, height: 200 }} />
          <img src={require('./images/ChangJiang.png')} style={{ width: 200, height: 200 }} />
          <img src={require('./images/ChangJiang.png')} style={{ width: 200, height: 200 }} />
        </Sidebar>
        <Container>
          <Header><div>
            <h1>Simple-Sell</h1>
          </div>
          </Header>
          <Content>
            <ButtonToolbar>
              <Button color="blue" appearance="primary" style={{ marginLeft: 10 }} onClick={getIdsell}><h2>The id of NFT</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={getPrice}><h2>Get Price</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="green" appearance="primary" onClick={buySell}><h2>Buy it !</h2></Button>
            </ButtonToolbar></Content>
          <Divider />
          <Header><div><h1>
            Dutch-Auction <Button color="yellow" appearance="primary" style={{ marginLeft: 1000 }} onClick={startdutch}> <h3>Start Auction</h3></Button></h1>
          </div>
          </Header>
          <Content>
            <ButtonToolbar style={style3}>
              <Button color="blue" appearance="primary" onClick={getIddutch}><h2>The id of NFT</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={ifStart}><h2>Start ?</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={getPriceDutch}><h2>Get NFT Price</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={Isend}><h2>End ?</h2></Button>
              <Button color="green" appearance="primary" style={{ marginLeft: 1000 }} onClick={buyDutch}><h2>Buy it !</h2></Button>
            </ButtonToolbar>
          </Content>
          <Divider />
          <Header><div><h1>
            English-Auction
            <Button color="yellow" appearance="primary" style={{ marginLeft: 800 }} onClick={startenglish}> <h3>Start Auction</h3></Button>
            <Button color="red" appearance="primary" style={{ marginLeft: 20 }} onClick={endenglish}> <h3>End Auction</h3></Button></h1>
          </div>
          </Header>
          <Content>
            <ButtonToolbar style={{ padding: 20 }}>
              <Button color="blue" appearance="primary" onClick={getIdenglish}><h2>The id of NFT</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={Isstart}><h2>Start ?</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={highestBidder}><h2>highestBidder</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={highestBid}><h2>highestBid</h2></Button>
              <Button appearance="primary" onClick={getcurrentTime} style={{ marginLeft: 50 }}><h2> End? </h2></Button>
            </ButtonToolbar>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={4}>
                  <div> <Input id="bidnumber" defaultValue="1000000000000000000" size="lg" style={{ width: 200, height: 50, marginLeft: 550 }}></Input></div>
                </Col>
                <Col xs={4}>
                  <div className="show-col"><Button color="green" appearance="primary" onClick={bid} style={{ width: 150, marginLeft: 550 }}  ><h2>Bid it</h2></Button></div>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
      </Container>

    </div>

  );
}



const root = createRoot(document.getElementById("root"));

root.render(<App />);
