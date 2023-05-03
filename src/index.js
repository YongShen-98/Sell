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

    alert('The price of ChangJiang NFT is : ' + price / 1000000000000000000 + ' RVT')
  }

  const buySell = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(sell_address, sell_abi, signer)
    await contract.buy('300000000000000000000')
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

    const resp = await contract.getPrice()
    alert(resp / 1000000000000000000)
  }

  const getAddressNFTDutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    const resp = await contract.nft()
    alert(resp)
  }

  const getIdNFTDutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    const resp = await contract.nftId()
    alert(resp)
  }
  const ifStart = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    const resp = await contract.startAt()

    if (resp == 0) {
      alert("The dutch does not start !")
    } else {
      alert("The dutch starts !")
    }
  }

  const gapBetweenStartEnd = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)

    await contract.getCurrentTime()

    const resp = await contract.expiresAt()
    const resp1 = await contract.currentTime()

    if (resp1 > resp) {
      alert("The dutch is ended !")
    } else {
      alert("The last time is :" + resp - resp1)
    }
  }

  const buyDutch = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(dutch_address, dutch_abi, signer)
    await contract.buy()
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

    alert(resp / 10**18)
  }

  const Isstart = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)
    const resp = await contract.started()
    alert(resp)
  }

  const ifsucceed = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(english_address, english_abi, signer)

    const resp = await contract.result()

    alert(resp)
  }
  

  return (
    <div>
      <Navbar>
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
            <h1>Simple-Sell
              <Button color="blue" appearance="primary" style={{ marginLeft: 500 }} onClick={getAddressNFTDutch}><h2>The address of NFT</h2></Button>
              <Button color="blue" appearance="primary" style={{ marginLeft: 10 }} onClick={getIdNFTDutch}><h2>The id of NFT</h2></Button>
            </h1>
          </div>
          </Header>
          <Content>
            <ButtonToolbar>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={getPrice}><h2>Get Price</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="green" appearance="primary" onClick={buySell}><h2>Buy it !</h2></Button>
            </ButtonToolbar></Content>
          <Divider />
          <Header><div><h1>
            Dutch-Auction <Button color="yellow" appearance="primary" style={{ marginLeft: 1000 }} onClick={startdutch}> <h3>Start Auction</h3></Button></h1>
          </div>
          </Header>
          <Content>
            <ButtonToolbar style={style3}>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={ifStart}><h2>Start ?</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={getPriceDutch}><h2>Get NFT Price</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button color="blue" appearance="primary" onClick={gapBetweenStartEnd}><h2>How long until the auction ends ?</h2></Button>
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
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={Isstart}><h2>Start ?</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={highestBidder}><h2>highestBidder</h2></Button>
              <h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2><h2></h2>
              <Button appearance="primary" onClick={highestBid}><h2>highestBid</h2></Button>
              <Button appearance="primary" onClick={ifsucceed} style={{marginLeft: 50}}><h2> Succeed ? </h2></Button>
             </ButtonToolbar>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={4}>
                  <div> <Input id="bidnumber" defaultValue="1000000000000000000" size="lg" style={{ width: 300, height: 50, marginLeft: 500 }}></Input></div>
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
