Dollar-to-naira Extension

# To run
<ol>
<li> git clone https://github.com/Sandee004/Dollar-monitor/ </li>
<li> cd collab </li>
<li> npm install </li>
  <li>npm run build</li>
<li> Go to your browser to activate:
  <ul>
    <li> For Firefox:
      <ul>
        <li> Go to <a>about:debugging</a> </li>
        <li>Click <a href="about:debugging#/runtime/this-firefox">This Firefox</a></li>
        <li>Click Load Temporary Add-On</li>
        <li>Navigate to the manifest.json file in the dist folder of this repo on your local machine</li>
        <li>Click the extensions icon on the top of the browser and click the extension that was just added "D2N Extension"</li>
      </ul>
      </li>
  </ul>
</li>
</ol>

<p>The graph shows the current price of dollar in naira as well as the prices of dollar over the last 7 days. ChartJS was used for the chart and API for the real time data.</p>
