<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:foo="http://www.foo.org/"
                xmlns:bar="http://www.bar.org">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Geocode response</h1>
                <xsl:for-each select="GeocodeResponse">
                    <p>Status :
                        <xsl:value-of select="status"/>
                    </p>
                </xsl:for-each>
                <xsl:for-each select="GeocodeResponse/result">
                    <p>Formatted Address :
                        <xsl:value-of select="formatted_address"/>
                    </p>
                </xsl:for-each>
                <xsl:for-each select="GeocodeResponse/result/geometry/location">
                    <p>Lat : <xsl:value-of select="lat"/>, Lng : <xsl:value-of select="lng"/></p>
                </xsl:for-each>
                <h3>Address Components</h3>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th>Long name</th>
                        <th>Short name</th>
                        <th>Type</th>
                    </tr>
                    <xsl:for-each select="GeocodeResponse/result/address_component">
                        <tr>
                            <td>
                                <xsl:value-of select="long_name"/>
                            </td>
                            <td>
                                <xsl:value-of select="short_name"/>
                            </td>
                            <td>
                                <xsl:value-of select="type"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th>Orientation</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    <h3>Viewport</h3>
                    <xsl:for-each select="GeocodeResponse/result/geometry/viewport/southwest">
                        <tr>
                            <td>
                                SouthWest
                            </td>
                            <td>
                                <xsl:value-of select="lat"/>
                            </td>
                            <td>
                                <xsl:value-of select="lng"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                    <xsl:for-each select="GeocodeResponse/result/geometry/viewport/northeast">
                        <tr>
                            <td>
                                NorthEast
                            </td>
                            <td>
                                <xsl:value-of select="lat"/>
                            </td>
                            <td>
                                <xsl:value-of select="lng"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th>Orientation</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                    <h3>Bounds</h3>
                    <xsl:for-each select="GeocodeResponse/result/geometry/bounds/southwest">
                        <tr>
                            <td>
                                SouthWest
                            </td>
                            <td>
                                <xsl:value-of select="lat"/>
                            </td>
                            <td>
                                <xsl:value-of select="lng"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                    <xsl:for-each select="GeocodeResponse/result/geometry/bounds/northeast">
                        <tr>
                            <td>
                                NorthEast
                            </td>
                            <td>
                                <xsl:value-of select="lat"/>
                            </td>
                            <td>
                                <xsl:value-of select="lng"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
