import React, { useState, useEffect } from 'react'
import { officeDescs } from '../data/Namelist'
import { Link, Tooltip, Spacer, Code, Textarea, Card, Text, Page, Grid, Button, Collapse, Divider, Row, Col, useInput, Input } from '@zeit-ui/react'
import { downloadAll, downloadPersons, keyToValue, randomEra } from './Utilities'
import * as Icon from '@zeit-ui/react-icons'
import { newFamObj, newPersArr, Generator } from './Generator'
import { Parser } from 'json2csv'
import { CSVLink } from 'react-csv'
import '../stylesheets/Information.css'
import {  } from '../data/Namelist'
import {  } from './Utilities'


const Information = () => {
  const [ extLink, setExtLink ] = useState(false)
  const [ showContent, setShowContent ] = useState(false)
  const [ data, setData ] = useState({})

  const contentFlip = () => {
    setShowContent(() => true)
    setData((prevState) => prevState = newFamObj)
  }

  useEffect(() => {
    if (extLink) {
      window.open('https://github.com/martenfrisk/KoreanDynastyGenerator/tree/source','_blank')
    }
  });
  const fields = ['personID', 'firstName', 'famName', 'rank', 'post']
  const json2csvParser = new Parser({ fields})
  const personData = json2csvParser.parse(newPersArr)


  const { state, setState, bindings } = useInput()
    
  useEffect(() => setState(randomEra), [])
  
  let eraSeed = state

  return (
    <>
    <Page>

    <Page.Header style={{marginTop: '2em', marginBottom: '-2em'}}>
      <Text h1>Korean Dynasty Generator</Text>
    </Page.Header>
    <Spacer y={3} />

    <Text small span>
        Enter your era name here
        </Text>
        <Text small span> (this is your seed; reinitializing with the same era name produces the same result) <br />
        </Text>
            <Input {...bindings} size="large" status="success"  style={{fontSize: "1.5em"}} />
        <Spacer y={0.5} />
        <Button size="large"  iconRight={<Icon.Shuffle />}
                onClick={() => setState(randomEra)}
        >
            Random Era name
        </Button>
        <Spacer y={0.5} />
        
    <Generator clickFunc={contentFlip} seed={eraSeed} />

    {showContent === true &&
    <Page.Content>
      <Card id='results' style={{marginTop: '-20px'}}>
      <Row>
         <Col span={12}>
          <Text h3  style={{ textAlign: 'center' }}>Top 10 families</Text>
          <Text h4  style={{ textAlign: 'center' }}>Family name (family members)</Text>
        </Col>
        
        <Col span={12}>
          <Text h4>
            {newFamObj[0].famName}&nbsp;family -&nbsp;{newFamObj[0].power}&nbsp;members (top 10 shown below)
          </Text>
          <Grid.Container>
            <Grid xs={12}><Text b>First name</Text></Grid>
            <Grid xs={6}><Text b>Rank</Text></Grid>
            <Grid xs={6}><Text b>Agency</Text><br /><Text small>Hover for info</Text></Grid>
          </Grid.Container>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          {newFamObj.slice(0, 10)
            .map((obj) => <div key={obj.familyId}><Text b>{obj.famName}</Text>&nbsp; ({obj.power})<br /></div>)}
          {/* <Grid xs={24} justify="center">
            <Text h3  style={{ textAlign: 'center' }}>Most powerful family and its top 10 family members</Text>
          </Grid> */}
        </Col>

        

          <Col span={12}>
                  <Grid.Container>
          {newFamObj[0].persons.slice(0, 10).map((ob) => {
            return (
              <Grid.Container gap={1} key={ob.personID}>
                <Grid xs={12}><Text small>{ob.firstName}</Text></Grid>
                { ob.rank && <>
                <Grid xs={6}><Text small>{ob.rank}</Text></Grid>
                <Grid xs={6}>
                <Tooltip type='success' hideArrow placement='leftEnd' text={keyToValue(ob.post, officeDescs)}>
                  <Text small style={{borderBottom: '1px gray dotted'}}>
                    {ob.post}
                  </Text>
                </Tooltip>
                </Grid>
                </> }
                <br />
              </Grid.Container>
            )
          })}
        </Grid.Container>

          </Col>
      </Row>
    </Card> 
    <Spacer y={1} />
    <Button icon={<Icon.ChevronsDown />} auto type='success' ghost style={{marginBottom: '-50px'}}>
        <Link href="#unedited">Jump to raw data</Link>
      </Button>
</Page.Content>
    }
    <Page.Content style={{marginBottom: '-40px', marginTop: '-40px'}}>
      <Card>
        <Text h3>
        Generate list of Korean names for worldbuilding
        </Text>
        <Text h5>
          Scroll down for your automatically generated list (refresh the page to get a new list)
        </Text>
        <Text blockquote size="1rem">
        This generator roughly simulates how power could have been divided by in <Link href="https://en.wikipedia.org/wiki/Joseon" icon style={{borderBottom: '1px gray dotted'}}>Joseon Korea</Link> by creating families including family members with names, ranks and titles. 
        </Text>
        <Spacer y={2} />

        <Collapse.Group>
          <Collapse title="Purpose" initialVisible>
          It started with me creating a map using the excellent <Link icon href="https://azgaar.github.io/Fantasy-Map-Generator/" style={{borderBottom: '1px gray dotted'}}>Azgaar's Fantasy Map Generator</Link> and deciding to base one nation on Joseon-era Korea. As I made up the backstory I realized that I would have to create several characters within the government and stumbled upon the State Code which happened to list all agencies, their staff and the rank of each official.<br />
          You can use this generator however you please and feel free to download the code from the <Link icon href="https://github.com/martenfrisk/KoreanDynastyGenerator/tree/source" style={{borderBottom: '1px gray dotted'}}>GitHub repo</Link> if you want to adjust anything. 
          </Collapse>
          <Collapse title="Implementation">
          While the number of government officials is based on those originally stipulated in the State Code, the data related to families is randomized due to lack of exact historical records. The bigger the family, the more likely that they will contain high-ranking officials. Not included are local and provincial government positions as well as the royal family (see Planned features below).
          </Collapse>
          <Collapse title="Names & Ranks">
          <Text p>
          The data is based on the <Link href="https://en.wikipedia.org/wiki/Gyeongguk_daejeon" icon style={{borderBottom: '1px gray dotted'}}>Korean State Code</Link> (gyeongguk daejeon) of 1471 which delineated the rank and number of officials in each government agency. In theory, every male citizen could sit the entrance exam to become a government official but in practice the power was concentrated in a few families.
          </Text>
          <Divider align="start">Names</Divider>
          <Text p>
          The first names are randomly chosen from the most popular names in South Korea today, with a few non-Korean names removed (e.g. Daniel). To simplify matters, I made each person in every family have a unique first name. I used less common surnames for the families because I didn't want Kims and Parks in my made-up world. You can adjust the list of names by editing the Namelist.jsx file. 
          </Text>
          <Divider align="start">Ranks</Divider>
          <Text p>
          There are a total of 19 ranks starting with Jeong 1, Jong 1, Jeong 2, Jong 2 and so on to Jong 9. Jeong 3 is further divided into Sr (Sang) and Jr (Ha).  
          </Text>
          </Collapse>
          <Collapse title="Planned features">
            <ul>
              <li>Local government positions</li>
              <li>Family clans (e.g. Gimhae Kim, Miryang Park)</li>
              <li>Automatic family tree generation</li>
              <li>Pages for each individual with more details</li>
              <li>Adjustable weights for randomizer</li>
            </ul>
          </Collapse>
        </Collapse.Group>

        <Card.Footer>
          <Button onClick={() => setExtLink(true)} icon={<Icon.Github />} size='mini' type='secondary'>
          GitHub Repo
          </Button>
        </Card.Footer>
      </Card> 
      </Page.Content>
    {showContent === true &&
<Page.Content>

    <Card>
    <Text h3>Raw data for export</Text>
    <Collapse.Group>
      <p id="textarea">
        In the textarea below is the full generated result. The following is an example of a single object, with only the first person. Click <Link href="./Infotable.html" style={{borderBottom: '1px gray dotted'}}>here</Link> more details on the keys (rank, post, power) and sources.
      </p>
      <Collapse title='Code example'>
        <Text h4></Text>
        <Code block>
        {`// results:
[{
    "familyId": 7,
    "famName": "Chae",
    "power" : 99,
    "persons" : [{ 
        "personID": "70",
        "firstName":"Useung",
        "rank":1,
        "post":"87"
    }]
}]

// persons list .csv file:
"personID","firstName","famName","rank","post"
"70","Seunggi","Chae",1,"87"
...
`}
        </Code>
        </Collapse>
        <Collapse title='Unedited results'>
        <Textarea 
          value={JSON.stringify(newFamObj, null, 2)}
          id="unedited"
          width="100%"
        />
        </Collapse>
        <Button 
            onClick={downloadAll} 
            icon={<Icon.Download />} 
            auto 
            style={{ textTransform: 'lowercase'}}>Download results as .json file
        </Button>
        <textarea 
          value={JSON.stringify(newPersArr, null, 2)}
          id="allPersons"
          style={{ display: 'none' }}
          readOnly
        />
        <Button 
            onClick={downloadPersons} 
            icon={<Icon.Download />} 
            auto 
            style={{ textTransform: 'lowercase', marginLeft: '10px'}}
        >
            Download list of persons as .json file
        </Button>
        <Button
            icon={<Icon.Download />} 
            auto 
            style={{ textTransform: 'lowercase', marginLeft: '10px'}}
        >
          <CSVLink 
            data={personData} 
            className='csv-down' 
            filename={'korgen-persons.csv'}
          >
            persons list as .csv
          </CSVLink>
        </Button>
      </Collapse.Group>
      </Card>
    </Page.Content>
    }
    <Spacer y={2} />
    <Page.Footer style={{textAlign: "right", paddingRight: "60px" }}>
      <Text small >Created with React. 
      <br />
      Styled with <Link href="https://github.com/zeit-ui/react" style={{borderBottom: '1px gray dotted'}}>Zeit UI</Link>.
      </Text>
    </Page.Footer>

    </Page>
    
    <Spacer y={2}/>    
    </>
    )
}

export default Information