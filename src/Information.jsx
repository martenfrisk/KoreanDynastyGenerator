import React from 'react'
import { officeDescs } from './Namelist'
import { Link, Tooltip, Spacer, Code, Textarea, Card, Text, Page, Grid, Button, Collapse, Divider, Row } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import { refreshPage, sortedFamObj, keyToValue, downloadTxtFile, downloadContent, newPersArr } from './GenAll'
import { Parser } from 'json2csv'
import { CSVLink } from 'react-csv';
import './Information.css'

const Information = () => {
  const fields = ['personID', 'firstName', 'famName', 'rank', 'post']
  const json2csvParser = new Parser({ fields})
  const personData = json2csvParser.parse(newPersArr)
  return (
    <>
    <Page>

    <Page.Header style={{marginTop: '2em', marginBottom: '-2em'}}>
      <Text h1>Korean Dynasty Generator</Text>
    </Page.Header>
    
    <Page.Content>
      <Card>
        <Text h3>
        Generate list of Korean names for worldbuilding
        </Text>
        <Text blockquote size="1rem">
        The data is based on the <Link href="https://en.wikipedia.org/wiki/Gyeongguk_daejeon" icon style={{borderBottom: '1px gray dotted'}}>Korean State Code</Link> (gyeongguk daejeon) of 1471 which delineated the rank and number of officials in each government agency. In theory, every male citizen could sit the entrance exam to become a government official but in practice the power was concentrated in a few families.<Spacer y={1} />
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
            <Button icon={<Icon.Github />} 
              href="https://github.com/martenfrisk/KoreanDynastyGenerator/tree/source" 
              auto 
              size="mini"
              type="success" 
              ghost
            >
            GitHub Repo</Button>
        </Card.Footer>
      </Card>

      <Spacer y={2} />
      
      <Button icon={<Icon.ChevronsDown />} auto style={{marginRight: '10px'}}>
          <Link href="#textarea">Jump to results</Link>
      </Button>

      <Button icon={<Icon.RotateCw />} onClick={refreshPage} auto>Regenerate (reloads page)</Button>
      
      <Spacer y={2}/>

      <Card hoverable>
        <Text h3  style={{ textAlign: 'center' }}>Top 30 families</Text>
        <Text h4  style={{ textAlign: 'center' }}>Family name (family members)</Text>
      
        <Grid.Container gap={2} justify="center">
          <Grid xs={6}>
            {sortedFamObj.slice(0, 10)
              .map((obj) => <div key={obj.familyId}><Text b>{obj.famName}</Text>&nbsp; ({obj.power}) </div>)}
          </Grid>
          <Grid xs={6}>
            {sortedFamObj.slice(11, 21)
              .map((obj) => <div key={obj.familyId}><Text b>{obj.famName}</Text>&nbsp;({obj.power})</div>)}
          </Grid>
          <Grid xs={6}>
              {sortedFamObj.slice(22, 32)
              .map((obj) => <div key={obj.familyId}><Text b>{obj.famName}</Text>&nbsp;({obj.power})</div>)}
          </Grid>
        </Grid.Container>
      </Card>

      <Spacer y={2}/>

      <Card hoverable>

      <Grid.Container gap={1} justify="left" >
      
        <Grid xs={24} justify="center">
          <Text h3  style={{ textAlign: 'center' }}>Most powerful family with members (ranks)</Text>
        </Grid>

        <Grid xs={24}>
          <Row justify="center">

            <Text h4>
              {sortedFamObj[0].famName}&nbsp;family -&nbsp;{sortedFamObj[0].power}&nbsp;members
            </Text>
            <Spacer y={2} />
          
          </Row>
        </Grid>

        <Grid xs={12}><Text b>First name</Text></Grid>
        <Grid xs={6}><Text b>Rank</Text></Grid>
        <Grid xs={6}><Text b>Agency</Text><br /><Text small>Hover for info</Text></Grid>

        <Divider volume={2} y={3} />

        <Grid.Container>
          {sortedFamObj[0].persons.map((ob) => {
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
    </Grid.Container>
    </Card> 

    <Spacer y={2}/>

    <Card hoverable>
      <p id="textarea">
        In the textarea below is the full generated result. The following is an example of a single object, with only the first person. Click <Link href="./Infotable.html" style={{borderBottom: '1px gray dotted'}}>here</Link> more details on the keys (rank, post, power) and sources.
      </p>
        <Text h4>Code example</Text>
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
        <Text h4>Unedited results</Text>
        <Textarea 
          value={JSON.stringify(sortedFamObj, null, 2)}
          id="results"
          width="100%"
        />
        <Spacer y={1} />
        <Button 
            onClick={downloadTxtFile} 
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
            onClick={downloadContent} 
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
      </Card>
    </Page.Content>
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