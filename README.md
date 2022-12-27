# Planning
## Requirements
* Take an array of bus visit timestamps at a stop and a timeframe. Calculate the AWT
* Take a timeframe, bus visit timestamps, and GTFS data. Calculate the EWT
* Combine AWT/EWT from multiple stops
* Combine AWT/EWT from multiple timeframes?
* bus bunching metric
    * Actual AWT vs AWT if buses were evenly spaced?
    * ATA 2018 analysis used percent of buses that arrived after another within a certain timeframe.
* bus route slowing metric - what sections of the route are the slowest? At what time of day?
    * MPH on route section?
    * dwell time on route section?
* actual performance vs theoretical ideal performance
    * How long does the bus take to make its route?
    * If the bus went at a constant speed with no stops, how long would it take?
    * Bus goes with no stops but a labeled speed. How long?
    * Labeled speed, constant stop time. How long?
    * What is the cause of additional timing
* AWT weighted by ridership during the day

## External
* Package for grabbing CTA bus data, GTFS data, train data
    * Chicago has bus speed data in [historical congestion tracker](https://data.cityofchicago.org/Transportation/Chicago-Traffic-Tracker-Historical-Congestion-Esti/sxs8-h27x). Unfortunately it doesn't cover all the arterials.
* Live map of buses
* Use rideshare data to identify latent transit demand. [trip data](https://data.cityofchicago.org/Transportation/Transportation-Network-Providers-Trips/m6dm-c72p)


## Formulas
* AWT = SUM(D^2) / (2T)
    * Average value of a sawtooth function
* EWT = SWT - AWT
* SWT = scheduled wait time
* EWT = excess wait time
* AWT = actual weight time
* D = duration between buses

# Scratchpad

## Multiple stops
AWT_stop1 = SUM(D_1^2)/(2T)
AWT_stop2 = SUM(D_2^2)/(2T)

AWT_avg = (AWT_s1 + AWT_s2)/2 
* same denominators

ATW_avg = SUM (AWT_stop)/n
* where n = total number of stops 

## AWT partitioning

T = D
AWT = D^2/(2D) = D/2

2nd partition (half before bus arrives)
d = t = D/2
AWT = (D/2)^2/(2(D/2) = (D^2/4)/D = D/4

1st partition (half after previous bus)
t = D/2
area = D^2/8 + D^2/4 = 3/8 * D^2
AWT = area/t = 3/4*D

* valid; average for people waiting in first partition will be longer than those in second partition
* doesn't intuitively represent what we want to show; normal service seems better or worse depending where you cut the timeframe
* need to find way to apply EWT continuously