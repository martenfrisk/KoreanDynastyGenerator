import React, { useEffect } from 'react'
import { nameArr, familyNameArr, rankPosts, departList, rankList, officeDescs } from './Namelist'
import { useState } from 'react'
import ReactTooltip from "react-tooltip"
import { Link, Tooltip, Spacer, Code, Textarea, Card, Text, Page, Grid, Button, Fieldset, Collapse, Divider, Row } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'
import Chance from 'chance'


const GenAll = (props) => {
    const [ famState, setFamState ] = useState({})

    const chance = new Chance()
    function weightedRandomDistrib(min,max,mean,varianceFactor) {
      let prob = [], seq = [];
      for(let i=min;i<max;i++) {
        prob.push(Math.pow(max-Math.abs(mean-i),varianceFactor));
        seq.push(i);
      }
      return chance.weighted(seq, prob);
    }
    function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    let famObj = []
    for (let i = 0; i < familyNameArr.length; i++) {
      let loopFam = {}
      let familyPower = weightedRandomDistrib(35,150,50,5)
      let familyName = familyNameArr[i]
      let familyId = i
      loopFam = {
        familyId: familyId,
        famName: familyName,
        power: familyPower,
        persons: []
      } 
      let number = loopFam.power
      let personArr = []
      let nameEnd = 676 - familyPower
      let firstNameNr = getRandomInt(0, nameEnd)
      for (let i = 0; i < number; i++) {
        let newName = nameArr[firstNameNr] 
        let personID = familyId + "" + i 
        personArr[i] = {
          personID: personID,
          firstName: newName
        }
        firstNameNr++
      }
      loopFam.persons = personArr
      famObj.push(loopFam)
    }
    
    

    
    Array.prototype.sortBy = function(p) {
        return this.slice(0).sort(function(a,b) {
          return (b[p] > a[p]) ? 1 : (b[p] < a[p]) ? -1 : 0;
        });
    }

    let sortedFamObj = famObj.sortBy('power')
    console.log(sortedFamObj)
  

    function getPostArrs(map) {
      let map_array = new Array(map.length);
      var c = 0;
      for (const key in map) {
        var max = map[key];
        for (var i = 1; i <= max; i++) {
          map_array[c] = key;
          c++;
        }
      }
      return map_array
    }

    const assignRanks = (group, groupSize, rankQuant, rankName, postArr) => {
      let selectGroup = group.slice(0, groupSize)
      let remPosts = rankQuant
      let i = 0
      let selectPerson = 0
      // let thisPostArr = postArr 
      do {
          let found = false
          while (!found) {
            if  (!selectGroup[i] || selectGroup[i].length <= i) {
              i = 0
              selectPerson = 0
            } else if (!selectGroup[i].persons[selectPerson].rank) {
                  selectGroup[i].persons[selectPerson].rank = rankName
                  if (postArr.length > 0) { selectGroup[i].persons[selectPerson].post = postArr.pop() }

                  selectPerson = 0
                  found = true
            } else {
                  selectPerson++
            }
          }
          remPosts--
          i++
          if (i >= selectGroup.length) {
              i = 0
          }
      } while (remPosts > 0)
    }


    assignRanks(sortedFamObj, 10, 24, 1, getPostArrs(rankPosts[0]))
    assignRanks(sortedFamObj, 13, 13, 2, getPostArrs(rankPosts[1]))
    assignRanks(sortedFamObj, 17, 50, 3, getPostArrs(rankPosts[2]))
    assignRanks(sortedFamObj, 19, 70, 4, getPostArrs(rankPosts[3]))
    assignRanks(sortedFamObj, 29, 84, 5, getPostArrs(rankPosts[4]))
    assignRanks(sortedFamObj, 32, 31, 6, getPostArrs(rankPosts[5]))
    assignRanks(sortedFamObj, 40, 67, 7, getPostArrs(rankPosts[6]))
    assignRanks(sortedFamObj, 41, 52, 8, getPostArrs(rankPosts[7]))
    assignRanks(sortedFamObj, 70, 123, 9, getPostArrs(rankPosts[8]))
    assignRanks(sortedFamObj, 75, 78, 10, getPostArrs(rankPosts[9]))
    assignRanks(sortedFamObj, 85, 218, 11, getPostArrs(rankPosts[10]))
    assignRanks(sortedFamObj, 111, 111, 12, getPostArrs(rankPosts[11]))
    assignRanks(sortedFamObj, 111, 326, 13, getPostArrs(rankPosts[12]))
    assignRanks(sortedFamObj, 40, 46, 14, getPostArrs(rankPosts[13]))
    assignRanks(sortedFamObj, 111, 383, 15, getPostArrs(rankPosts[14]))
    assignRanks(sortedFamObj, 65, 68, 16, getPostArrs(rankPosts[15]))
    assignRanks(sortedFamObj, 111, 543, 17, getPostArrs(rankPosts[16]))
    assignRanks(sortedFamObj, 111, 122, 18, getPostArrs(rankPosts[17]))
    assignRanks(sortedFamObj, 111, 2023, 19, getPostArrs(rankPosts[18]))

 
    useEffect(() => {
      setFamState(sortedFamObj)

    }, [])

    const keyToValue = (numb, arr) => {
      let replace_map = arr

      return replace_map[numb]
    }

    let downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob([document.getElementById('results').value], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "results-kor-gen.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }

    function refreshPage() {
      window.location.reload(false);
    }

  return (
    <>
    <Page>
    <Page.Content>
      <Fieldset>
        <Text h3>
        Generate list of Korean names for worldbuilding
        </Text>
        <Fieldset.Subtitle>
        <Text blockquote size="1rem">
        The data is based on the <Link href="https://en.wikipedia.org/wiki/Gyeongguk_daejeon" icon style={{borderBottom: '1px gray dotted'}}>Korean State Code</Link> (gyeongguk daejeon) of 1471 which delineated the rank and number of officials in each government agency. In theory, every male citizen could sit the entrance exam to become a government official but in practice the power was concentrated in a few families.<Spacer y={1} />
        This generator roughly simulates how power could have been divided by in <Link href="https://en.wikipedia.org/wiki/Joseon" icon style={{borderBottom: '1px gray dotted'}}>Joseon Korea</Link> by creating families including family members with names, ranks and titles. 
        </Text>
        <Spacer y={2} />
      <Collapse.Group>
        <Collapse title="Purpose" initialVisible>
        It started with me creating a map using the excellent <Link icon href="https://azgaar.github.io/Fantasy-Map-Generator/" style={{borderBottom: '1px gray dotted'}}>Azgaar's Fantasy Map Generator</Link> and deciding to base one nation on Joseon-era Korea. As I made up the backstory I realized that I would have to create several characters within the government and stumbled upon the State Code which happened to list all agencies, their staff and the rank of each official.<br />
        You can use this generator however you please and feel free to download the code from the <Link icon href="" style={{borderBottom: '1px gray dotted'}}>GitHub repo</Link> if you want to adjust anything. 
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
          </ul>
        </Collapse>
      </Collapse.Group>
      </Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Actions>
            <Button icon={<Icon.Github />} href="" auto size="mini">GitHub Repo</Button>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
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
              .map((obj) => <div><Text b>{obj.famName}</Text>&nbsp; ({obj.power}) </div>)}
          </Grid>
          <Grid xs={6}>
            {sortedFamObj.slice(11, 21)
              .map((obj) => <div><Text b>{obj.famName}</Text>&nbsp;({obj.power})</div>)}
          </Grid>
          <Grid xs={6}>
              {sortedFamObj.slice(22, 32)
              .map((obj) => <div><Text b>{obj.famName}</Text>&nbsp;({obj.power})</div>)}
          </Grid>
        </Grid.Container>
      </Card>

      <Spacer y={2}/>

      <Card hoverable>

      <Grid.Container gap={1} justify="left" >
      <Grid xs={24} justify="center">
        <Text h3  style={{ textAlign: 'center' }}>Most powerful family with members (ranks)</Text>
      </Grid>
        {sortedFamObj.slice(0, 1).map((obj) => {
          return (<>
              <Grid xs={24}>
              <Row justify="center">
              <Text h4>
                {obj.famName}&nbsp;family -&nbsp;{obj.power}&nbsp;members
              </Text>
              <Spacer y={2} />
              </Row>
              </Grid>
                <Grid xs={12}><Text b>First name</Text></Grid>
                <Grid xs={6}><Text b>Rank</Text></Grid>
                <Grid xs={6}><Text b>Agency</Text><br /><Text small>Hover for info</Text></Grid>

                <Divider volume={2} y={3} />
                <Grid.Container>

              {obj.persons.map((ob) => {
                return (
                  <Grid.Container gap={1}>
                    <Grid xs={12}><Text small>{ob.firstName}</Text></Grid>
                    { ob.rank && <>
                    <Grid xs={6}><Text small>{keyToValue(ob.rank, rankList)}</Text></Grid>
                    <Grid xs={6}><Text small style={{borderBottom: '1px gray dotted'}}><Tooltip type='secondary' placement='left' leaveDelay='50' text={keyToValue(ob.post, officeDescs)}>{keyToValue(ob.post, departList)}</Tooltip></Text></Grid>
                    </> }
                    <br />
                  </Grid.Container>
                )
              })}
                </Grid.Container>
            </>)
        })}
    </Grid.Container>
    </Card> 

    <Spacer y={2}/>

    <Card hoverable>
      <p id="textarea">
        In the textarea below is the full generated result. The following is an example of a single object, with only the first person. Click <Link href="../public/Infotable.html">here</Link> more details on the keys (rank, post, power) and sources.
      </p>
      <Text h4>Code example</Text>
      <Code block>
      {`[{
        "familyId": 7,
        "famName": "Chae",
        "power" : 99,
        "persons" : [
          { "personID": "70",
            "firstName":"Useung",
            "rank":1,
            "post":"87"
          }
        }]`}
      </Code>
      <Text h4>Unedited results</Text>
    <Textarea 
      defaultValue={JSON.stringify(sortedFamObj)}
      value={JSON.stringify(sortedFamObj)}
      width="100%"
      id="results"
    />
    <Spacer y={1} />
    <Button onClick={downloadTxtFile} icon={<Icon.Download />} auto style={{ textTransform: 'lowercase'}}>Download results as .txt file</Button>

    </Card>
    <ReactTooltip />
    </Page.Content>
    <Spacer y={2} />
    <Page.Footer style={{textAlign: "right", paddingRight: "60px" }}>
      <Text small >Created with React. 
      <br />
      Styled with <Link href="https://github.com/zeit-ui/react" style={{borderBottom: '1px gray dotted'}}>Zeit UI</Link>.
      </Text>
    </Page.Footer>
    </Page>
    <Spacer y={2} />
  </>
  )
}

export default GenAll