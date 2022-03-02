import{_ as s,c as n,o as a,d as l}from"./app.5cbb4beb.js";const d='{"title":"Genesis Block","description":"","frontmatter":{},"headers":[],"relativePath":"guide/appendix/genesis.md","lastUpdated":1646223014000}',o={},p=l(`<h1 id="genesis-block" tabindex="-1">Genesis Block <a class="header-anchor" href="#genesis-block" aria-hidden="true">#</a></h1><p>The genesis block is the first block in your blockchain. It&#39;s never empty, even if <code>configs/peer/genesis.json</code> is. We recommend adding at least one more account to the genesis block; in our case, it was <em>alice</em>@wonderland, which has the public key <code>ed01207233bfc89dcbd68c19fde6ce6158225298ec1131b6a130d1aeb454c1ab5183c0</code> . Think of it as the password used to &quot;log in&quot; as <em>alice</em>. <em>Also note, <strong>Iroha is case-sensitive,</strong> meaning that <strong>Alice@wonderland is different from alice@wonderland.</strong></em> It should go without saying that <em>alice@wonderland</em> is not the same as <em>alice@looking_glass</em> either.</p><details class="details custom-block"><summary>Genesis Block</summary><div class="language-json"><pre class="shiki shiki-light" style="background-color:#ffffff;"><code><span class="line"><span style="color:#24292F;">{</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#0550AE;">&quot;transactions&quot;</span><span style="color:#24292F;">: [</span></span>
<span class="line"><span style="color:#24292F;">    {</span></span>
<span class="line"><span style="color:#24292F;">      </span><span style="color:#0550AE;">&quot;isi&quot;</span><span style="color:#24292F;">: [</span></span>
<span class="line"><span style="color:#24292F;">        {</span></span>
<span class="line"><span style="color:#24292F;">          </span><span style="color:#0550AE;">&quot;Register&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#0550AE;">&quot;object&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">              </span><span style="color:#0550AE;">&quot;Raw&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                </span><span style="color:#0550AE;">&quot;Identifiable&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                  </span><span style="color:#0550AE;">&quot;Domain&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;wonderland&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;accounts&quot;</span><span style="color:#24292F;">: {},</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;asset_definitions&quot;</span><span style="color:#24292F;">: {},</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;metadata&quot;</span><span style="color:#24292F;">: {}</span></span>
<span class="line"><span style="color:#24292F;">                  }</span></span>
<span class="line"><span style="color:#24292F;">                }</span></span>
<span class="line"><span style="color:#24292F;">              }</span></span>
<span class="line"><span style="color:#24292F;">            }</span></span>
<span class="line"><span style="color:#24292F;">          }</span></span>
<span class="line"><span style="color:#24292F;">        },</span></span>
<span class="line"><span style="color:#24292F;">        {</span></span>
<span class="line"><span style="color:#24292F;">          </span><span style="color:#0550AE;">&quot;Register&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#0550AE;">&quot;object&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">              </span><span style="color:#0550AE;">&quot;Raw&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                </span><span style="color:#0550AE;">&quot;Identifiable&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                  </span><span style="color:#0550AE;">&quot;NewAccount&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;alice&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;domain_name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;wonderland&quot;</span></span>
<span class="line"><span style="color:#24292F;">                    },</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;signatories&quot;</span><span style="color:#24292F;">: [</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0A3069;">&quot;ed01207233bfc89dcbd68c19fde6ce6158225298ec1131b6a130d1aeb454c1ab5183c0&quot;</span></span>
<span class="line"><span style="color:#24292F;">                    ],</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;metadata&quot;</span><span style="color:#24292F;">: {}</span></span>
<span class="line"><span style="color:#24292F;">                  }</span></span>
<span class="line"><span style="color:#24292F;">                }</span></span>
<span class="line"><span style="color:#24292F;">              }</span></span>
<span class="line"><span style="color:#24292F;">            }</span></span>
<span class="line"><span style="color:#24292F;">          }</span></span>
<span class="line"><span style="color:#24292F;">        },</span></span>
<span class="line"><span style="color:#24292F;">        {</span></span>
<span class="line"><span style="color:#24292F;">          </span><span style="color:#0550AE;">&quot;Register&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#0550AE;">&quot;object&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">              </span><span style="color:#0550AE;">&quot;Raw&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                </span><span style="color:#0550AE;">&quot;Identifiable&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                  </span><span style="color:#0550AE;">&quot;AssetDefinition&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;rose&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;domain_name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;wonderland&quot;</span></span>
<span class="line"><span style="color:#24292F;">                    },</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;value_type&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;Quantity&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;metadata&quot;</span><span style="color:#24292F;">: {},</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;mintable&quot;</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">true</span></span>
<span class="line"><span style="color:#24292F;">                  }</span></span>
<span class="line"><span style="color:#24292F;">                }</span></span>
<span class="line"><span style="color:#24292F;">              }</span></span>
<span class="line"><span style="color:#24292F;">            }</span></span>
<span class="line"><span style="color:#24292F;">          }</span></span>
<span class="line"><span style="color:#24292F;">        },</span></span>
<span class="line"><span style="color:#24292F;">        {</span></span>
<span class="line"><span style="color:#24292F;">          </span><span style="color:#0550AE;">&quot;Mint&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#0550AE;">&quot;object&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">              </span><span style="color:#0550AE;">&quot;Raw&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                </span><span style="color:#0550AE;">&quot;U32&quot;</span><span style="color:#24292F;">: </span><span style="color:#0550AE;">13</span></span>
<span class="line"><span style="color:#24292F;">              }</span></span>
<span class="line"><span style="color:#24292F;">            },</span></span>
<span class="line"><span style="color:#24292F;">            </span><span style="color:#0550AE;">&quot;destination_id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">              </span><span style="color:#0550AE;">&quot;Raw&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                </span><span style="color:#0550AE;">&quot;Id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                  </span><span style="color:#0550AE;">&quot;AssetId&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;definition_id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;rose&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;domain_name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;wonderland&quot;</span></span>
<span class="line"><span style="color:#24292F;">                    },</span></span>
<span class="line"><span style="color:#24292F;">                    </span><span style="color:#0550AE;">&quot;account_id&quot;</span><span style="color:#24292F;">: {</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;alice&quot;</span><span style="color:#24292F;">,</span></span>
<span class="line"><span style="color:#24292F;">                      </span><span style="color:#0550AE;">&quot;domain_name&quot;</span><span style="color:#24292F;">: </span><span style="color:#0A3069;">&quot;wonderland&quot;</span></span>
<span class="line"><span style="color:#24292F;">                    }</span></span>
<span class="line"><span style="color:#24292F;">                  }</span></span>
<span class="line"><span style="color:#24292F;">                }</span></span>
<span class="line"><span style="color:#24292F;">              }</span></span>
<span class="line"><span style="color:#24292F;">            }</span></span>
<span class="line"><span style="color:#24292F;">          }</span></span>
<span class="line"><span style="color:#24292F;">        }</span></span>
<span class="line"><span style="color:#24292F;">      ]</span></span>
<span class="line"><span style="color:#24292F;">    }</span></span>
<span class="line"><span style="color:#24292F;">  ]</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span></code></pre></div></details>`,3),e=[p];function t(c,r,y,i,u,F){return a(),n("div",null,e)}var A=s(o,[["render",t]]);export{d as __pageData,A as default};
