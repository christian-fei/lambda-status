# Installation
## 1. Create lambda
```
claudia create --region eu-central-1 --handler lambda.handler
```

## 2. Configure `event.json` according to your configuration.


## 3. Create an interval to execute the status check.
```
claudia add-scheduled-event --event event.json --name schedule-status --rate "1 minute"
```
