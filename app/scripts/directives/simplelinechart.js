'use strict';

/**
 * @ngdoc directive
 * @name angularjsApp.directive:simpleLineChart
 * @description
 * # simpleLineChart
 */
angular.module('angularjsApp')
    .directive('d3Bars', ['d3Service', function(d3Service) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                gheight: "=",
                onClick: "&"
            },
            replace: true,
            link: function(scope, iElement, iAttrs) {
                d3Service.d3().then(function(d3) {

                    var cntrWidth = d3.select(".chart-container").node().getBoundingClientRect().width;
                    var margin = { top: 20, right: 20, bottom: 50, left: 40 },
                        width = cntrWidth - margin.left - margin.right,
                        height = scope.gheight - margin.top - margin.bottom;

                    var svg = d3.select(iElement[0])
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    // on window resize, re-render d3 canvas
                    window.onresize = function() {
                        return scope.$apply();
                    };
                    scope.$watch(function() {
                        return angular.element(window)[0].innerWidth;
                    }, function() {
                        return scope.render(scope.data);
                    });

                    // watch for data changes and re-render
                    scope.$watch('data', function(newVals, oldVals) {
                        return scope.render(newVals);
                    }, true);

                    // define render function
                    scope.render = function(data) {
                        // remove all previous items before render
                        if(svg){
                        	 svg.selectAll("*").remove();
                        }
                       
                        var cntrWidth = d3.select(".chart-container").node().getBoundingClientRect().width;
                        var margin = { top: 20, right: 20, bottom: 50, left: 40 },
                            width = cntrWidth - margin.left - margin.right,
                            height = scope.gheight - margin.top - margin.bottom;

                        var gradient = svg.append("svg:defs")
                            .append("svg:linearGradient")
                            .attr("id", "gradient")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "100%")
                            .attr("y2", "100%")
                            .attr("spreadMethod", "pad");

                        gradient.append("svg:stop")
                            .attr("offset", "0%")
                            .attr("stop-color", "#4e88b8")
                            .attr("stop-opacity", 1);

                        gradient.append("svg:stop")
                            .attr("offset", "100%")
                            .attr("stop-color", "#149bf7")
                            .attr("stop-opacity", 1);

                        // D3 scales = just math
                        // x is a function that transforms from "domain" (data) into "range" (usual pixels)
                        // domain gets set after the data loads
                        var x = d3.scale.ordinal()
                            .rangeRoundBands([0, width], .1);

                        var y = d3.scale.linear()
                            .range([height, 0]);

                        // D3 Axis - renders a d3 scale in SVG
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");

                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left");

                        svg.append("g")
                            .attr("class", "x axis")
                            .attr("transform", "translate(0," + height + ")");

                        svg.append("g")
                            .attr("class", "y axis")
                            .append("text") 
                            .attr("transform", "rotate(-90)")
					        .attr("y", 0 - margin.left)
					        .attr("x",0 - (height / 2))
					        .attr("dy", "1em")
					        .style("text-anchor", "middle")
					        .text("Value");

                        // set the height based on the calculations above
                        //svg.attr('height', height);
                        svg.attr("width", width)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                        // D3 scales = just math
                        // x is a function that transforms from "domain" (data) into "range" (usual pixels)
                        // domain gets set after the data loads
                        // measure the domain (for x, unique letters) (for y [0,maxFrequency])
                        // now the scales are finished and usable
                        x.domain(data.map(function(d) {
                            return d.name; }));
                        y.domain([0, d3.max(data, function(d) {
                            return d.value; })]);

                        // another g element, this time to move the origin to the bottom of the svg element
                        // someSelection.call(thing) is roughly equivalent to thing(someSelection[i])
                        //   for everything in the selection\
                        // the end result is g populated with text and lines!
                        svg.select('.x.axis')
                            .transition()
                            .duration(300)
                            .call(xAxis)
                            .selectAll("text")
                            .attr("y", 0)
                            .attr("x", 9)
                            .attr("dy", ".35em")
                            .attr("transform", "rotate(45)")
                            .style("text-anchor", "start");;

                        // same for yAxis but with more transform and a title
                        svg.select(".y.axis").transition().duration(300).call(yAxis)

                        // THIS IS THE ACTUAL WORK!
                        var bars = svg.selectAll(".bar").data(data, function(d) {
                                return d.name; }) // (data) is an array/iterable thing, second argument is an ID generator function

                        bars.exit()
                            .transition()
                            .duration(300)
                            .attr("y", y(0))
                            .attr("height", height - y(0))
                            .style('fill-opacity', 1e-6)
                            .remove();

                        // data that needs DOM = enter() (a set/selection, not an event!)
                        bars.enter().append("rect")
                            .attr("class", "bar")
                            .attr("y", y(0))
                            .attr("height", height - y(0))
                            .style("fill", "url(#gradient)")
                            .on('click', function() {
                              scope.data = scope.onClick();
                              scope.render(scope.data);
                            })
                            .on('mouseover', function(data) {
                                d3.select(this).style('opacity', .8);
                                //tip.show(data);

                            })
                            .on('mouseout', function(data) {
                                //tip.hide(data);
                                d3.select(this).style('opacity', 1);
                            })
                            // the "UPDATE" set:
                        bars.transition().duration(300).attr("x", function(d) {
                                return x(d.name); }) // (d) is one item from the data array, x is the scale object from above
                            .attr("width", x.rangeBand()) // constant, so no callback function(d) here
                            .attr("y", function(d) {
                                return y(d.value); })
                            .attr("height", function(d) {
                                return height - y(d.value); }); // flip the height, because y's domain is bottom up, but SVG renders top down


                    };

                });
            }
        };
    }]);